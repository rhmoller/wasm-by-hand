import * as constant from "./constant.wast";

declare var WebAssembly: any;

function instantiate(bytes, imports) {
    const bytes8 = Uint8Array.from(bytes);
    return WebAssembly.compile(bytes8).then(m => new WebAssembly.Instance(m, imports));
}

describe("WebAssembly", () => {

    it("returns the constant 42", (done) => {
        instantiate(constant, {}).then(instance => {
            expect(instance.exports.answer).toBe(42);
            done();
        });
    });

});