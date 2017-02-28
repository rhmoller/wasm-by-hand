import * as empty from "./empty.wast";
import * as constant from "./constant.wast";
import * as square from "./square.wast";
import * as controlflow from "./controlflow.wast";
import * as counter from "./counter.wast";

declare const WebAssembly: any;

function instantiate(bytes, imports) {
    const bytes8 = Uint8Array.from(bytes);
    return WebAssembly.compile(bytes8).then(m => new WebAssembly.Instance(m, imports));
}

describe("empty", () => {
    it("does not blow up", (done) => {
        instantiate(empty, {}).then(() => {
            done();
        });
    });
});

describe("constant", () => {
    it("returns the constant 42", (done) => {
        instantiate(constant, {}).then(instance => {
            expect(instance.exports.answer).toBe(42);
            done();
        });
    });
});

describe("square", () => {
    it("squares the input number", (done) => {
        instantiate(square, {}).then(instance => {
            expect(instance.exports.square(2)).toBe(4);
            expect(instance.exports.square(3)).toBe(9);
            expect(instance.exports.square(4)).toBe(16);
            done();
        });
    });
});

describe("square with alternative syntax", () => {
    it("squares the input number", (done) => {
        instantiate(square, {}).then(instance => {
            expect(instance.exports.square_alt_syntax(2)).toBe(4);
            expect(instance.exports.square_alt_syntax(3)).toBe(9);
            expect(instance.exports.square_alt_syntax(4)).toBe(16);
            done();
        });
    });
});

describe("counter", () => {
    it("counts", (done) => {
        instantiate(counter, {}).then(instance => {
            let v = instance.exports.count();
            expect(v).toEqual(0);

            v = instance.exports.count();
            expect(v).toEqual(1);
            done();
        });
    });
});

describe("controlflow", () => {
    it("loops", (done) => {
        let output = [];
        instantiate(controlflow, {
            imports: {
                trace: i => output.push(i)
            }
        }).then(instance => {
            let loop = instance.exports.loop;
            loop();
            expect(output).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8 ,9]);
            done();
        });
    });
});