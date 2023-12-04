import { plugin } from 'rollup-plugin-wit-component';
import { onMount } from 'svelte';
import { rollup } from '@rollup/browser';

import shimSource from './bundled/_preview2-shim.js?raw';
import { transpile } from './bundled/_jco.js';

/**
 * Call this loader function to combine the wasm bytes and imports into a fully wired JavaScript module.
 *
 * @param {Uint8Array} wasmBytes - The arrayBuffer bytes of the wasm file
 * @param {String} importables - A string of JavaScript code that exports the functions that the wasm component will use
 *
 * @returns {Promise} - A promise that resolves to the module
 */
export async function load(wasmBytes, importables) {

  /**
   * These names are all arbitary.
   * They are only used internally by the bundler. But we need to call them _something_, so these are the names:
   */
  let importName = './importables.js';
  let shimName = './shim.js';
  let name = 'component';

  // We roll up the bytes, about 3.5 MB worth. You could instead of uses a CDN like unpkg.com.
  // This map function tells the bundler under what name the code is mapped to.
  let map = Object.assign(
    {
      // Using bundled shim is faster (but bigger: 3.5MB) than CDN https://unpkg.com/@bytecodealliance/preview2-shim/lib/browser/index.js
      'wasi:cli/*': `${shimName}#*`,
      'wasi:filesystem/*': `${shimName}#*`,
      'wasi:io/*': `${shimName}#*`,
      'wasi:sockets/*': `${shimName}#*`,
    },
    {
      // specify location of imported functions, if applicable
      'component:cargo-comp/imports': importName
    }
  );

  let opts = {
    name,
    map: Object.entries(map ?? {}),
    validLiftingOptimization: false,
    noNodejsCompat: true,
    tlaCompat: false,
    base64Cutoff: 4096
  };
  // pass into generate along with bytes
  let { files, imports, exports } = await transpile(wasmBytes, opts);

  // Bundle all the imports into one file, using URLs to link to the wasm blobs
  let	code = await rollup({
    input: name + '.js',
    plugins: [plugin([...files, [importName, importables], [shimName, shimSource]])]
  })
    .then((bundle) => bundle.generate({ format: 'es' }))
    .then(({ output }) => output[0].code);

  // generate url from code blob
  let blob = new Blob([code], { type: 'text/javascript' });
  let url = URL.createObjectURL(blob);

  let mod = await import(/* @vite-ignore */ url);

  return mod;
}


