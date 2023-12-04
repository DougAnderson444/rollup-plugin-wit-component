# A Demo WIT Component

Demo wasm component for the rollup plugin.

## Build Options

A. From this directory, run:

`cargo component build --release`

B. Or from the root of the repo:

`cargo component build --manifest-path crates/demo/Cargo.toml --release`

C. or by package name:

`cargo component build --package demo --release`

## Use

The `src/lib.rs` will be built into a wasm component and placed in the `target/wasm32-wasi/release` directory.

`target/wasm32-wasi/release/demo.wasm` is the wasm file to use.
