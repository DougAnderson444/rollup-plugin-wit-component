# Rollup Plugin WIT (WebAssembly Interface Types) Component

This plugin allows you to take a WebAssembly component and import it into the browser.

Rollup uses this plugin to fetch and bundle all the dependencies into one file. It also converts generated \*.wasm bytes into local URLs and replaces the imports with the URLs.

In the end, you get an ES Module with your Wasm functions exported.

You're welcome. I accept cash 💸, VISA, and Mastercard 💳.

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
        'wasi:*': 'https://unpkg.com/@bytecodealliance/preview2-shim@0.0.9/lib/browser/*'
    },
    {
        // specify location of imported functions, if your wasm component imports any
        // 'mypackage:mynamespace': `./my-imported-function.js`
    }
);

let opts = {
    name // 'hello-world',
    map: Object.entries(map ?? {}),
    instantiation: false,
    validLiftingOptimization: false,
    noNodejsCompat: true,
    tlaCompat: false,
    base64Cutoff: 999999
};

// pass into generate along with bytes
let { files, imports, exports } = generate(wasmBytes, opts);

/// Rollup dependencies into single file so the browser can use it
code = await rollup({
    input: name + '.js',
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

```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
