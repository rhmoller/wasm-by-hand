import "whatwg-fetch";

declare var WebAssembly: any;

const importObject = { imports: { i: arg => console.log(arg) } };

function instantiate(bytes, imports) {
    return WebAssembly.compile(bytes).then(m => new WebAssembly.Instance(m, imports));
}

fetch('dist/hello.wasm').then(response => response.arrayBuffer())
    .then(bytes => instantiate(bytes, importObject))
    .then(instance => instance.exports.e());
