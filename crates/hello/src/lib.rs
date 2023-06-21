struct Component;

impl bindings::Example for Component {
    /// Say hello!
    fn hello(name: String) -> String {
        // For IMPORTS: bindings         ::package::namespace::importname...
        // For EXPORTS: bindings::exports::package::namespace::exportname...
        bindings::component::cargo_comp::imports::prnt("Hello, World!");
        format!("Hello, {name}!")
    }
}

bindings::export!(Component);
