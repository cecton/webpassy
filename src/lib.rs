#![feature(use_extern_macros)]

extern crate wasm_bindgen;
extern crate base64;
extern crate sha1;

use wasm_bindgen::prelude::*;

#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }
}

#[wasm_bindgen]
extern {
    pub fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello, {}!", name));
}

#[wasm_bindgen]
pub fn make_hint(password: &str) -> String {
    make_password(password, "foo")[0..6].to_string()
}

#[wasm_bindgen]
pub fn make_password(password: &str, site: &str) -> String {
    let digest = sha1::Sha1::from(format!("_{}_{}_", password, site))
        .digest()
        .bytes();
    let b64 = base64::encode(digest.as_ref());

    passwordify(&b64)
}

fn passwordify(s: &str) -> String {
    let bytes = s.as_bytes();
    let symbols: &[u8] = "!?+-=*/@#$%&()[];:,.<>".as_bytes();

    format!(
        "{}{}{}{}{}",
        ("A".as_bytes()[0] + bytes[0] % 26) as char,
        ("a".as_bytes()[0] + bytes[1] % 26) as char,
        ("0".as_bytes()[0] + bytes[2] % 10) as char,
        symbols[bytes[3] as usize % symbols.len()] as char,
        s.get(4..26).unwrap(),
    )
}
