# Rollup Plugin WIT (WebAssembly Interface Types) Component

This plugin allows you to take a WebAssembly component and import it into the browser.

Rollup uses this plugin to fetch and bundle all the dependencies into one file. It also converts generated \*.wasm bytes into local URLs and replaces the imports with the URLs.

In the end, you get an ES Module with your Wasm functions exported.

You're welcome. I accept cash 💸, VISA, and Mastercard 💳.

## Demo Rust -> Wasm Component

A demo component written in Rust is located at [`crates/hello`](crates/hello).

The interface is defined in the wit file [`crates/hello/wit/world.wit`](crates/hello/wit/world.wit).

More details located in [`README.md`](crates/hello/README.md).

## Usage

Demo usage is at [src/routes/+page.svelte](src/routes/+page.svelte).

To bundle your wit-component in the browser:

```js
import { rollup } from '@rollup/browser';
import { plugin } from 'rollup-plugin-wit-component';

// ... in the browser environment:
const bindgen = await import('rollup-plugin-wit-component/bindgen');
await bindgen.$init; // wait for wasm to initialize in the browser
const { generate } = bindgen;

let name = 'hello-world';
// Pick your JCO options:
let map = Object.assign(
	{
		'wasi:*': '@bytecodealliance/preview2-shim@0.0.9/lib/browser/*'
	},
	{
		// specify location of imported functions, if your wasm component imports any
		// 'mypackage:mynamespace': `./my-imported-function.js`
	}
);

let opts = {
	name, // 'hello-world',
	map: Object.entries(map ?? {}),
	instantiation: false,
	validLiftingOptimization: false,
	noNodejsCompat: true, // no nodejs specific code
	tlaCompat: false, // top level await or not
	base64Cutoff: 4096 // any wasm smaller than this will be inlined as base64
};

// pass into generate along with bytes
let { files, imports, exports } = generate(wasmBytes, opts);

// Rollup dependencies into single file so the browser can use it
code = await rollup({
	input: name + '.js',
	plugins: [plugin(files)]
})
	.then((bundle) => bundle.generate({ format: 'es' }))
	.then(({ output }) => output[0].code);

// generate url from code blob
let blob = new Blob([code], { type: 'text/javascript' });
let url = URL.createObjectURL(blob);

// Read ES Module from URL
let { hello } = await import(/* @vite-ignore */ url);

// Use the ES Module
let whatSayYou = hello('World'); // Hello, World!
console.log({ whatSayYou }); // Hello, World!
```

## Developing

[Build the demo crate](crates/hello/README.md) first with

`cargo component build --package hello --release`

This will generate the wasm bytes at `target/wasm32-wasi/release/hello.wasm`.

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```
