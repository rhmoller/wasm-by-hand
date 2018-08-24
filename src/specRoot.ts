import * as empty from "./empty.wat";
import * as constant from "./constant.wat";
import * as square from "./square.wat";
import * as controlflow from "./controlflow.wat";
import * as counter from "./counter.wat";

declare const WebAssembly: any;

function instantiate(wastBuffer, imports) {
    return WebAssembly.instantiate(wastBuffer, imports).then(result => result.instance);
}

describe("empty", () => {
    it("does not blow up", (done) => {
        instantiate(empty, {}).then((instance) => {
            expect(instance).not.toBeNull();
            done();
        });
    });
});

describe("constant", () => {
    it("returns the constant 42", (done) => {
        instantiate(constant, {}).then(instance => {
            // a change was squeezed into the spec after release
            // so now we have inconsistent behaviour in browsers
            // old behaviour: represent export as JS number
            // new behaviour: box number in a WebAssembly.Global
            const answer = instance.exports.answer;
            if (typeof answer === "number") {
              expect(answer).toBe(42);
            } else {
              expect(answer.value).toBe(42);
            }
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
