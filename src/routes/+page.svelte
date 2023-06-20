<script>
	import { plugin } from 'rollup-plugin-wit-component';
	import { onMount } from 'svelte';
	import { rollup } from '@rollup/browser';

	// @ts-ignore
	import wasm from './hello.world.comp.wasm?url';

	/**
	 * @type {string | null}
	 */
	let whatSayYou;
	/**
	 * @type {string}
	 */
	let code;

	onMount(async () => {

		const bindgen = await import('rollup-plugin-wit-component/bindgen');
		await bindgen.$init; // wait for wasm to initialize in the browser
		const { generate } = bindgen;

		// get wasm bytes from url
		let wasmBytes = await fetch(wasm).then((res) => res.arrayBuffer());

		let map = Object.assign(
			{
				'wasi:*': 'https://unpkg.com/@bytecodealliance/preview2-shim@0.0.9/lib/browser/*'
			},
			{
				// specify location of imported functions, if applicable
				// 'component:cargo-comp': `http://localhost:5173/ipns-pubsub.js`
			}
		);

		// see jco/cmd/transpile.js
		let opts = {
			name: 'hello-world',
			map: Object.entries(map ?? {}),
			instantiation: false,
			validLiftingOptimization: false,
			noNodejsCompat: true,
			tlaCompat: false,
			base64Cutoff: 999999
		};
		// pass into generate along with bytes
		let { files, imports, exports } = generate(wasmBytes, opts);

		console.log({ files, imports, exports });

		code = await rollup({
			input: 'hello-world.js',
			plugins: [plugin(files)]
		})
			.then((bundle) => bundle.generate({ format: 'es' }))
			.then(({ output }) => output[0].code);

		// generate url from code blob
		let blob = new Blob([code], { type: 'text/javascript' });
		let url = URL.createObjectURL(blob);

		let { helloWorld } = await import(/* @vite-ignore */ url);

		whatSayYou = helloWorld();
		console.log({ whatSayYou });
	});
</script>

<svelte:head>
	<title>Rollup Plugin</title>
</svelte:head>

{#if whatSayYou}
	<h1>{whatSayYou}</h1>
{/if}

<pre>
	<code>{@html code}</code>
</pre>
