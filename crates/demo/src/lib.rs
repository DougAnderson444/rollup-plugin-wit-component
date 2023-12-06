cargo_component_bindings::generate!();

use bindings::exports::component::cargo_comp::named;
use bindings::Guest;

struct Component;

impl Guest for Component {
    /// Say hello!
    fn hello() -> String {
        bindings::component::cargo_comp::imports::prnt("Calling prnt from Rust");
        "Hello, World!".to_string()
    }
}

impl named::Guest for Component {
    /// Say hello!
    fn name() -> String {
        bindings::component::cargo_comp::imports::prnt("Calling prnt from Rust");
        "There's a name here somewhere...".to_string()
    }
}
