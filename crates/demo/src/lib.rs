cargo_component_bindings::generate!();

use bindings::Guest;

struct Component;

impl Guest for Component {
    /// Say hello!
    fn hello() -> String {
        bindings::component::cargo_comp::imports::prnt("Calling prnt from Rust");
        "Hello, World!".to_string()
    }
}
