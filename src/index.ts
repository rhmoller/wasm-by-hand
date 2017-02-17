// import "whatwg-fetch";
// import * as hello from "./hello.wast";
//
// declare var WebAssembly: any;
//
// const importObject = { imports: { i: arg => console.log(arg) } };
//
// function instantiate(bytes, imports) {
//     const bytes8 = Uint8Array.from(bytes);
//     return WebAssembly.compile(bytes8).then(m => new WebAssembly.Instance(m, imports));
// }
//
// instantiate(hello, importObject).then(instance => instance.exports.e());
