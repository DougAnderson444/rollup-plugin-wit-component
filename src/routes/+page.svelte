<script>
	import { plugin } from 'rollup-plugin-wit-component';
	import { onMount } from 'svelte';
	import { rollup } from '@rollup/browser';

	// @ts-ignore
	// import wasm from './hello.world.comp.wasm?url';
	import wasm from './cargo_comp.wasm?url';

	// get imports as a string
	import importables from './importables.js?raw';

	/**
	 * @type {string | null}
	 */
	let whatSayYou;
	/**
	 * @type {string}
	 */
	let code = "Standby, generating your bundle...";

	onMount(async () => {

		const bindgen = await import('rollup-plugin-wit-component/bindgen');
		await bindgen.$init; // wait for wasm to initialize in the browser
		const { generate } = bindgen;

		// get wasm bytes from url
		let wasmBytes = await fetch(wasm).then((res) => res.arrayBuffer());

		let importName = './importables.js'
		// You could Rollup the bytes of these files instead of uses a CDN. Designer's choice.
		let map = Object.assign(
			{
				// https://unpkg.com/browse/@bytecodealliance/preview2-shim@0.0.9/package.json
				// https://unpkg.com/@bytecodealliance/preview2-shim@0.0.9/lib/browser/index.js
				// https://unpkg.com/@bytecodealliance/preview2-shim@0.0.9/lib/browser/io.js
				// 'wasi:*': 'https://unpkg.com/@bytecodealliance/preview2-shim@0.0.9/lib/browser/*' // also works
				'wasi:*': '@bytecodealliance/preview2-shim@0.0.9/lib/browser/*' // plugin will us unpkg to resolve
			},
			{
				// specify location of imported functions, if applicable
				'component:cargo-comp': importName
			}
		);

		let name = 'hello-world';
		// see jco/cmd/transpile.js
		let opts = {
			name,
			map: Object.entries(map ?? {}),
			instantiation: false,
			validLiftingOptimization: false,
			noNodejsCompat: true,
			tlaCompat: false,
			base64Cutoff: 4096
		};
		// pass into generate along with bytes
		let { files, imports, exports } = generate(wasmBytes, opts);
		console.log({ files, imports, exports });

		code = await rollup({
			input: name + '.js',
			plugins: [plugin([...files, [importName,  importables]])]
		})
			.then((bundle) => bundle.generate({ format: 'es' }))
			.then(({ output }) => output[0].code);

		// generate url from code blob
		let blob = new Blob([code], { type: 'text/javascript' });
		let url = URL.createObjectURL(blob);

		let { hello } = await import(/* @vite-ignore */ url);

		whatSayYou = hello("World");
		console.log({ whatSayYou });
	});
</script>

<svelte:head>
	<title>Rollup Plugin WIT Demo</title>
</svelte:head>

{#if whatSayYou}
	<h1>{whatSayYou}</h1>
{/if}

<pre>
	<code>{@html code}</code>
</pre>
