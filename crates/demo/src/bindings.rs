// Generated by `wit-bindgen` 0.16.0. DO NOT EDIT!
const _: () = {
  
  #[doc(hidden)]
  #[export_name = "hello"]
  #[allow(non_snake_case)]
  unsafe extern "C" fn __export_hello() -> i32 {
    #[allow(unused_imports)]
    use wit_bindgen::rt::{alloc, vec::Vec, string::String};
    
    // Before executing any other code, use this function to run all static
    // constructors, if they have not yet been run. This is a hack required
    // to work around wasi-libc ctors calling import functions to initialize
    // the environment.
    //
    // This functionality will be removed once rust 1.69.0 is stable, at which
    // point wasi-libc will no longer have this behavior.
    //
    // See
    // https://github.com/bytecodealliance/preview2-prototyping/issues/99
    // for more details.
    #[cfg(target_arch="wasm32")]
    wit_bindgen::rt::run_ctors_once();
    
    let result0 = <_GuestImpl as Guest>::hello();
    let ptr1 = _RET_AREA.0.as_mut_ptr() as i32;
    let vec2 = (result0.into_bytes()).into_boxed_slice();
    let ptr2 = vec2.as_ptr() as i32;
    let len2 = vec2.len() as i32;
    ::core::mem::forget(vec2);
    *((ptr1 + 4) as *mut i32) = len2;
    *((ptr1 + 0) as *mut i32) = ptr2;
    ptr1
  }
  
  const _: () = {
    #[doc(hidden)]
    #[export_name = "cabi_post_hello"]
    #[allow(non_snake_case)]
    unsafe extern "C" fn __post_return_hello(arg0: i32,) {
      let l0 = *((arg0 + 0) as *const i32);
      let l1 = *((arg0 + 4) as *const i32);
      wit_bindgen::rt::dealloc(l0, (l1) as usize, 1);
    }
  };
};
use super::Component as _GuestImpl;
pub trait Guest {
  fn hello() -> wit_bindgen::rt::string::String;
}

#[allow(unused_imports)]
use wit_bindgen::rt::{alloc, vec::Vec, string::String};

#[repr(align(4))]
struct _RetArea([u8; 8]);
static mut _RET_AREA: _RetArea = _RetArea([0; 8]);
pub mod component {
  pub mod cargo_comp {
    
    #[allow(clippy::all)]
    pub mod imports {
      #[used]
      #[doc(hidden)]
      #[cfg(target_arch = "wasm32")]
      static __FORCE_SECTION_REF: fn() = super::super::super::__link_section;
      #[allow(unused_unsafe, clippy::all)]
      pub fn prnt(msg: &str,){
        
        #[allow(unused_imports)]
        use wit_bindgen::rt::{alloc, vec::Vec, string::String};
        unsafe {
          let vec0 = msg;
          let ptr0 = vec0.as_ptr() as i32;
          let len0 = vec0.len() as i32;
          
          #[cfg(target_arch = "wasm32")]
          #[link(wasm_import_module = "component:cargo-comp/imports")]
          extern "C" {
            #[link_name = "prnt"]
            fn wit_import(_: i32, _: i32, );
          }
          
          #[cfg(not(target_arch = "wasm32"))]
          fn wit_import(_: i32, _: i32, ){ unreachable!() }
          wit_import(ptr0, len0);
        }
      }
      
    }
    
  }
}
pub mod exports {
  pub mod component {
    pub mod cargo_comp {
      
      #[allow(clippy::all)]
      pub mod named {
        #[used]
        #[doc(hidden)]
        #[cfg(target_arch = "wasm32")]
        static __FORCE_SECTION_REF: fn() = super::super::super::super::__link_section;
        const _: () = {
          
          #[doc(hidden)]
          #[export_name = "component:cargo-comp/named#name"]
          #[allow(non_snake_case)]
          unsafe extern "C" fn __export_name() -> i32 {
            #[allow(unused_imports)]
            use wit_bindgen::rt::{alloc, vec::Vec, string::String};
            
            // Before executing any other code, use this function to run all static
            // constructors, if they have not yet been run. This is a hack required
            // to work around wasi-libc ctors calling import functions to initialize
            // the environment.
            //
            // This functionality will be removed once rust 1.69.0 is stable, at which
            // point wasi-libc will no longer have this behavior.
            //
            // See
            // https://github.com/bytecodealliance/preview2-prototyping/issues/99
            // for more details.
            #[cfg(target_arch="wasm32")]
            wit_bindgen::rt::run_ctors_once();
            
            let result0 = <_GuestImpl as Guest>::name();
            let ptr1 = _RET_AREA.0.as_mut_ptr() as i32;
            let vec2 = (result0.into_bytes()).into_boxed_slice();
            let ptr2 = vec2.as_ptr() as i32;
            let len2 = vec2.len() as i32;
            ::core::mem::forget(vec2);
            *((ptr1 + 4) as *mut i32) = len2;
            *((ptr1 + 0) as *mut i32) = ptr2;
            ptr1
          }
          
          const _: () = {
            #[doc(hidden)]
            #[export_name = "cabi_post_component:cargo-comp/named#name"]
            #[allow(non_snake_case)]
            unsafe extern "C" fn __post_return_name(arg0: i32,) {
              let l0 = *((arg0 + 0) as *const i32);
              let l1 = *((arg0 + 4) as *const i32);
              wit_bindgen::rt::dealloc(l0, (l1) as usize, 1);
            }
          };
        };
        use super::super::super::super::super::Component as _GuestImpl;
        pub trait Guest {
          fn name() -> wit_bindgen::rt::string::String;
        }
        
        #[allow(unused_imports)]
        use wit_bindgen::rt::{alloc, vec::Vec, string::String};
        
        #[repr(align(4))]
        struct _RetArea([u8; 8]);
        static mut _RET_AREA: _RetArea = _RetArea([0; 8]);
        
      }
      
    }
  }
}

#[cfg(target_arch = "wasm32")]
#[link_section = "component-type:example"]
#[doc(hidden)]
pub static __WIT_BINDGEN_COMPONENT_TYPE: [u8; 501] = [3, 0, 7, 101, 120, 97, 109, 112, 108, 101, 0, 97, 115, 109, 13, 0, 1, 0, 7, 58, 1, 65, 2, 1, 66, 2, 1, 64, 1, 3, 109, 115, 103, 115, 1, 0, 4, 0, 4, 112, 114, 110, 116, 1, 0, 4, 1, 28, 99, 111, 109, 112, 111, 110, 101, 110, 116, 58, 99, 97, 114, 103, 111, 45, 99, 111, 109, 112, 47, 105, 109, 112, 111, 114, 116, 115, 5, 0, 11, 13, 1, 0, 7, 105, 109, 112, 111, 114, 116, 115, 3, 0, 0, 7, 51, 1, 65, 2, 1, 66, 2, 1, 64, 0, 0, 115, 4, 0, 4, 110, 97, 109, 101, 1, 0, 4, 1, 26, 99, 111, 109, 112, 111, 110, 101, 110, 116, 58, 99, 97, 114, 103, 111, 45, 99, 111, 109, 112, 47, 110, 97, 109, 101, 100, 5, 0, 11, 11, 1, 0, 5, 110, 97, 109, 101, 100, 3, 2, 0, 7, 157, 1, 1, 65, 2, 1, 65, 6, 1, 66, 2, 1, 64, 1, 3, 109, 115, 103, 115, 1, 0, 4, 0, 4, 112, 114, 110, 116, 1, 0, 3, 1, 28, 99, 111, 109, 112, 111, 110, 101, 110, 116, 58, 99, 97, 114, 103, 111, 45, 99, 111, 109, 112, 47, 105, 109, 112, 111, 114, 116, 115, 5, 0, 1, 64, 0, 0, 115, 4, 0, 5, 104, 101, 108, 108, 111, 1, 1, 1, 66, 2, 1, 64, 0, 0, 115, 4, 0, 4, 110, 97, 109, 101, 1, 0, 4, 1, 26, 99, 111, 109, 112, 111, 110, 101, 110, 116, 58, 99, 97, 114, 103, 111, 45, 99, 111, 109, 112, 47, 110, 97, 109, 101, 100, 5, 2, 4, 1, 28, 99, 111, 109, 112, 111, 110, 101, 110, 116, 58, 99, 97, 114, 103, 111, 45, 99, 111, 109, 112, 47, 101, 120, 97, 109, 112, 108, 101, 4, 0, 11, 13, 1, 0, 7, 101, 120, 97, 109, 112, 108, 101, 3, 4, 0, 0, 93, 12, 112, 97, 99, 107, 97, 103, 101, 45, 100, 111, 99, 115, 0, 123, 34, 119, 111, 114, 108, 100, 115, 34, 58, 123, 34, 101, 120, 97, 109, 112, 108, 101, 34, 58, 123, 34, 100, 111, 99, 115, 34, 58, 34, 65, 110, 32, 101, 120, 97, 109, 112, 108, 101, 32, 119, 111, 114, 108, 100, 32, 102, 111, 114, 32, 116, 104, 101, 32, 99, 111, 109, 112, 111, 110, 101, 110, 116, 32, 116, 111, 32, 116, 97, 114, 103, 101, 116, 46, 34, 125, 125, 125, 0, 70, 9, 112, 114, 111, 100, 117, 99, 101, 114, 115, 1, 12, 112, 114, 111, 99, 101, 115, 115, 101, 100, 45, 98, 121, 2, 13, 119, 105, 116, 45, 99, 111, 109, 112, 111, 110, 101, 110, 116, 6, 48, 46, 49, 56, 46, 50, 16, 119, 105, 116, 45, 98, 105, 110, 100, 103, 101, 110, 45, 114, 117, 115, 116, 6, 48, 46, 49, 54, 46, 48];

#[inline(never)]
#[doc(hidden)]
#[cfg(target_arch = "wasm32")]
pub fn __link_section() {}
