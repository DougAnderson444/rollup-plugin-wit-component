bundle:
  node _bundle-gen.js

build: 
  cargo component build --workspace --release

prev: build
  npm run build && npm run preview -- --open

publish:
  npm run package
  npm publish
