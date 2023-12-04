# Rollup Plugin WIT (WebAssembly Interface Types) Component

When [`jco`](https://github.com/bytecodealliance/jco/) transpiles a WebAssembly Interface Types (WIT) component, it generates a number of `.js` and `.wasm` files. These files need to be bundled together to be used in the browser. Notably, the `.wasm` file needs to be converted to a Blob URL and the `.js` files need to be bundled together. This package includes a plugin which finds the `.wasm` files and transforms them into Blob URLs so they can be resolved by fetching that URL in the bundled `.js` file.

Thus, this plugin allows you to take WebAssembly component bytes and import it into the browser.

In the end, you get an ES Module with your Wasm functions exported.


## Usage

There is a convenience function call `load` that is exported from this library which makes combining `.wasm` bytes and `importables` easy. All you need are your wasm bytes and your importable functions.

Demo usage is at [src/routes/+page.svelte](src/routes/+page.svelte).

To bundle your wit-component in the browser:

```js
// You need to give the JavaScript code to `jco` so it can wire it up to the wasm component
let importables = `export const prnt = function (string) {
console.log('from importables func: ', string);
};`

// Make sure you're in the Browser environment when importing the plugin
// The Vite bundler bundles this library for the Browser environment
const { load } = await import('rollup-plugin-wit-component');

// Load the wasm component bytes as an array buffer
let wasmBytes = await fetch(wasmURL).then((res) => res.arrayBuffer());

// Load the wasm component + imports to get the exported module functions
let mod = await load(wasmBytes, importables);

// mod.an_export_function() is now available
```

## Demo

1. First you need a Wasm Interface Type Component to load. A demo component written in Rust is located at [`crates/demo`](crates/demo).

2. The component from 1) needs to implement the interface, which is defined in the wit file [`crates/demo/wit/world.wit`](crates/demo/wit/world.wit).

More details located in [`README.md`](crates/demo/README.md).

## Developing

Ensure you have [`cargo-component`](https://github.com/bytecodealliance/cargo-component) installed:

```bash
cargo install cargo-component
```

[Build the demo crate](crates/demo/README.md) with

```bash
cargo component build --package demo --release
```

This will generate the wasm bytes at `target/wasm32-wasi/release/demo.wasm`.

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

### JCO Fork

Note that this build uses [a fork](https://github.com/DougAnderson444/jco/tree/no-top-level-await) of `jco` until [issue #284](https://github.com/bytecodealliance/jco/issues/284) is resolved and we can use `transpile` right from `jco` in the browser.
