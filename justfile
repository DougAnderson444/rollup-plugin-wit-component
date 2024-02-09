bundle:
  node _bundle-gen.js

build: 
  cargo component build
  cargo component build --release

npm:
  npm run build && npm run preview -- --open

preview: bundle build npm

publish:
  npm run package
  npm publish
