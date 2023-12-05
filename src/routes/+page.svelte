<script>
	import { onMount } from 'svelte';

	// Import wasm wasm component bytes as a url
	// Make sure you first run:
	// $ cargo component build --release
	import wasmURL from '../../target/wasm32-wasi/release/demo.wasm?url';

	// You could also use VIte's convenince loader to get imports as a string
	// import importables from './importables.js?raw';

	let whatSayYou = 'Standby, generating your bundle...';

	onMount(async () => {
		// You need to give the JavaScript code to `jco` so it can wire it up to the wasm component
		let importableCode = `export const prnt = function (string) {
      console.log('from importables func: ', string);
    };`;

		// Make sure you're in the Browser environment when importing the plugin
		const { load } = await import('rollup-plugin-wit-component');

		// Load the wasm component bytes as an array buffer
		let wasmBytes = await fetch(wasmURL).then((res) => res.arrayBuffer());

		let importables = [{ 'component:cargo-comp/imports': importableCode }];

		// Load the wasm component + imports to get the exported module functions
		let { hello } = await load(/* @vite-ignore */ wasmBytes, importables);

		whatSayYou = hello('World');
		console.log({ whatSayYou });
	});
</script>

<svelte:head>
	<title>Rollup Plugin WIT Demo</title>
</svelte:head>

{#if whatSayYou}
	<h1>{whatSayYou}</h1>
{/if}
