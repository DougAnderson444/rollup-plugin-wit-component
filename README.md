# Rollup Plugin WIT (WebAssembly Interface Types) Component

This plugin allows you to take a WebAssembly component and import it into the browser.

Rollup uses this plugin to fetch and bundle all the dependencies into one file. It also converts generated \*.wasm bytes into local URLs and replaces the imports with the URLs.

In the end, you get an ES Module with your Wasm functions exported.

You're welcome. I accept cash 💸, VISA, and Mastercard 💳.

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
