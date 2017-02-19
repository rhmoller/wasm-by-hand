import * as constant from "./constant.wast";
import * as square from "./square.wast";
import * as controlflow from "./controlflow.wast";
import * as counter from "./counter.wast";

declare const WebAssembly: any;

function instantiate(bytes, imports) {
    const bytes8 = Uint8Array.from(bytes);
    return WebAssembly.compile(bytes8).then(m => new WebAssembly.Instance(m, imports));
}

describe("constant.wast", () => {
    it("returns the constant 42", (done) => {
        instantiate(constant, {}).then(instance => {
            expect(instance.exports.answer).toBe(42);
            done();
        });
    });
});

describe("square.wast", () => {
    it("squares the input number", (done) => {
        instantiate(square, {}).then(instance => {
            expect(instance.exports.square(2)).toBe(4);
            expect(instance.exports.square(3)).toBe(9);
            expect(instance.exports.square(4)).toBe(16);
            done();
        });
    });
});

describe("counter", () => {
    it("counts", (done) => {
        instantiate(counter, {}).then(instance => {
            console.log("exports", instance.exports);
            let v = instance.exports.count();
            expect(v).toEqual(0);

            v = instance.exports.count();
            expect(v).toEqual(1);
            done();
        });
    });
});