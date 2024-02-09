// A script to pre-bundle preview2-shim so we don't have to download it at runtime.
// This is a bit of a hack, but it's a lot faster than downloading the shim at runtime.

// Bundle these imports into a single, totally resolved file:
// import {
// 		clocks,
// 		filesystem,
// 		http,
// 		io,
// 		random,
// 		sockets,
// 		cli
// 	} from '@bytecodealliance/preview2-shim';
// How to run this script:
// 2. Run `node _bundle-gen.js` in this directory.
// 3. Commit the changes to shim-bundle.js.
// 4. Run `npm run build` in the root of this repo again.
// 5. Commit the changes to the rest of the files.
// 6. Push to GitHub.
// 7. Run `npm publish` in the root of this repo.
// 8. Run `npm run deploy` in the root of this repo.

import { build } from 'vite';
import { fileURLToPath } from 'url';
import path from 'path';
import terser from '@rollup/plugin-terser';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const outDir = './src/lib/bundled';

export const bundleShim = async () => {

  for (const entry of ['_preview2-shim']) {
		console.log(`Bundling ${entry}...`);
		await build({
			configFile: false,
			build: {
				outDir,
				lib: {
					entry: path.resolve(__dirname, `${entry}.js`),
					fileName: entry,
					name: entry
				},
				emptyOutDir: false,
				minify: true,
				sourcemap: false,
				rollupOptions: {
					output: [
						{
							sourcemap: false,
							format: 'es',
							dir: outDir,
							manualChunks: false,
							inlineDynamicImports: true,
							name: 'app',
							compact: true,
							plugins: [
              terser()
            ]
						}
					],
					plugins: [
						terser()
					]
				}
			}
		});
    console.log(`Done!`);
  }
};

(async () => {
  await bundleShim();
})();
