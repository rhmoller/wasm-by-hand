import fs from "fs";
import path from "path";
const wabt = require("./libwabt")();

it("compiles empty module", async () => {
    const instance = await compileAndInstantiate("empty.wat");

    expect(instance.exports).toEqual({});
});

it("squares the input number", async () => {
    const instance = await compileAndInstantiate("square.wat");

    expect(instance.exports.square(2)).toEqual(4);
    expect(instance.exports.square(3)).toEqual(9);
    expect(instance.exports.square(4)).toEqual(16);
});

it("squares the input name (alternative syntax)", async () => {
    const instance = await compileAndInstantiate("square.wat");

    expect(instance.exports.square_alt_syntax(2)).toEqual(4);
    expect(instance.exports.square_alt_syntax(3)).toEqual(9);
    expect(instance.exports.square_alt_syntax(4)).toEqual(16);
});

it("counter increments number for each invocation", async () => {
    const instance = await compileAndInstantiate("counter.wat");

    let count = instance.exports.count();
    expect(count).toEqual(0);

    count = instance.exports.count();
    expect(count).toEqual(1);

    count = instance.exports.count();
    expect(count).toEqual(2);
});

it("exports the global constant", async () => {
    const instance = await compileAndInstantiate("constant.wat");

    const answer = instance.exports.answer;

    // a change was squeezed into the WebAssembly spec after MVP release
    // old behaviour: represent export as JS number
    // new behaviour: box number in a WebAssembly.Global

    if (typeof answer === "number") {
        expect(answer).toEqual(42);
    } else {
        expect(answer.value).toEqual(42);
    }
});

it("loops from 0 to 9", async () => {
    const output: Array<number> = [];
    const instance = await compileAndInstantiate("controlflow.wat", {
        imports: {
            trace: (i: any) => output.push(i)
        }
    });

    instance.exports.loop();

    expect(output).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
});

async function compileAndInstantiate(watFile: string, imports: any = {}) {
    const pathToWatFile = path.resolve("src", "wat", watFile);
    const wastBuffer = fs.readFileSync(pathToWatFile, {encoding: "UTF-8"});
    const parsed = wabt.parseWat(watFile, wastBuffer);
    parsed.resolveNames();
    parsed.validate();
    const binaryOutput = parsed.toBinary({log: true, write_debug_names: true});
    const buffer = binaryOutput.buffer;
    const result = await WebAssembly.instantiate(buffer, imports);
    return result.instance;
}
