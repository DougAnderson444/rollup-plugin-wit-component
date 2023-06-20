import { sleep } from 'yootils';

const fetch_cache = new Map();

async function fetch_if_uncached(url) {
	if (fetch_cache.has(url)) {
		return fetch_cache.get(url);
	}

	await sleep(200);

	const promise = fetch(url)
		.then(async (r) => {
			if (r.ok) {
				return {
					url: r.url,
					body: await r.text()
				};
			}

			throw new Error(await r.text());
		})
		.catch((err) => {
			fetch_cache.delete(url);
			throw err;
		});

	fetch_cache.set(url, promise);
	return promise;
}

async function follow_redirects(url) {
	const res = await fetch_if_uncached(url);
	return res.url;
}

export const plugin = (modules) => ({
	name: 'loader',
	async resolveId(importee, importer) {
		if (importee.endsWith('.wasm')) {
			return path.resolve(path.dirname(importer), importee);
		}

		// importing from provided data
		if (modules.hasOwnProperty(importee)) {
			return importee;
		}

		// remove trailing slash
		if (importee.endsWith('/')) importee = importee.slice(0, -1);

		// importing from a URL
		if (importee.startsWith('http:') || importee.startsWith('https:')) return importee;

		// importing from (probably) unpkg
		if (importee.startsWith('.')) {
			const url = new URL(importee, importer).href;
			return await follow_redirects(url);
		} else {
			// fetch from unpkg
			if (importer in lookup) {
				const match = /^(@[^/]+\/)?[^/]+/.exec(importee);
				if (match) imports.add(match[0]);
			}

			try {
				const pkg_url = await follow_redirects(`${packagesUrl}/${importee}/package.json`);
				const pkg_json = (await fetch_if_uncached(pkg_url)).body;
				const pkg = JSON.parse(pkg_json);

				if (pkg.svelte || pkg.module || pkg.main) {
					const url = pkg_url.replace(/\/package\.json$/, '');
					return new URL(pkg.svelte || pkg.module || pkg.main, `${url}/`).href;
				}
			} catch (err) {
				// ignore
			}

			return await follow_redirects(`${packagesUrl}/${importee}`);
		}

		return importee; // catch all
	},
	async load(id) {
		if (modules.hasOwnProperty(id)) {
			return modules[id];
		}

		const res = await fetch_if_uncached(id);
		return res.body;
	},
	async transform(code, id) {
		// only transform the code if it's a `.js` file
		if (!id.endsWith('.js')) return;

		let matches = code.match(/new URL\((.*)/g);
		if (!matches || !matches.length) return;

		let fileName = matches[0].match(/'(.*)'/)[1];
		if (!fileName.endsWith('.wasm')) return;

		// match and replace any './' with "" from the file name
		fileName = fileName.replace('./', '');

		// make a blob url of the bytes of the wasm file from modules[fileName]
		let wasmBlobUrl = URL.createObjectURL(
			new Blob([modules[fileName]], { type: 'application/wasm' })
		);

		// return if undefined
		if (!wasmBlobUrl || wasmBlobUrl == 'undefined') return;

		// find and replace new URL('./hello-world.core.wasm', import.meta.url) with a Blob URL of the bytes from modules[fileName]
		code = code.replace(/new URL\('.*', import.meta.url\)/g, `'${wasmBlobUrl}'`);

		return {
			code,
			map: { mappings: '' } // TODO: use https://github.com/Rich-Harris/magic-string
		};
	}
});

export default plugin;
