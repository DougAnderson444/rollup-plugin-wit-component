<script>
	import { plugin } from '$lib';
	import { onMount, tick } from 'svelte';

	import { rollup } from '@rollup/browser';

	const modules = {
		'main.js': "import foo from 'foo.js'; export {foo};",
		'foo.js': 'export default () => console.log(42);'
	};

	let bundled;
	/**
	 * @type {BlobPart}
	 */
	let code;

	onMount(async () => {
		code = await rollup({
			input: 'main.js',
			plugins: [plugin(modules)]
		})
			.then((bundle) => bundle.generate({ format: 'es' }))
			.then(({ output }) => output[0].code);

		console.log({ code });

		// generate url from blob
		let blob = new Blob([code], { type: 'text/javascript' });
		let url = URL.createObjectURL(blob);

		let app = await import(/* @vite-ignore */ url);

		console.log({ app });
		app.foo();
	});
</script>

<svelte:head>
	<title>Rollup Plugin</title>
</svelte:head>

<pre>
	<code>{@html code}</code>
</pre>
