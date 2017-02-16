import "whatwg-fetch";
import * as hello from "./hello.wast";

declare var WebAssembly: any;

const importObject = { imports: { i: arg => console.log(arg) } };

function instantiate(bytes, imports) {
    return WebAssembly.compile(bytes).then(m => new WebAssembly.Instance(m, imports));
}

const bytes = Uint8Array.from(hello);
instantiate(bytes, importObject).then(instance => instance.exports.e());
