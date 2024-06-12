mod bindings;

use bindings::exports::component::cargo_comp::named;
use bindings::Guest;

use chrono::prelude::*;

struct Component;
bindings::export!(Component with_types_in bindings);

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
        let timestamp = Utc::now().format("%Y-%m-%d %H:%M:%S UTC").to_string();
        format!("The timestamp is: {}", timestamp)
    }
}
