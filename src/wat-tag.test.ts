import {wat} from "./wasm-util";

describe("wat-tag", () => {
    it("Compiles an empty module", async (done) => {
        const module = await wat`(module)`;
        const instance = WebAssembly.instantiate(module);
        expect(instance).not.toBe(null);
        done();
    });

    it("Compiles the square function", async (done) => {
        const module = await wat`
            (module
                (func (export "square") (param $i i32) (result i32)
                    get_local $i
                    get_local $i
                    i32.mul
                )
            )
        `;
        const instance = await WebAssembly.instantiate(module);

        expect(instance).not.toBe(null);
        expect(instance.exports.square(3)).toBe(9);
        done();
    });
});
