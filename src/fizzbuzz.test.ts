import {compileAndInstantiate, decodeWasmString} from "./wasm-util";

it("Prints fizzbuzz", async (done) => {

    const lines: Array<string> = [];
    const memory = new WebAssembly.Memory({initial: 1});
    const instance = await compileAndInstantiate("fizzbuzz.wat", {
        js: {
            memory,
            println: (offset: number, length: number) => {
                const string = decodeWasmString(memory, offset, length);
                lines.push(string);
            },
        }
    });

    instance.exports.fizzbuzz(16);

    expect(lines[0]).toEqual("1");
    expect(lines[1]).toEqual("2");
    expect(lines[2]).toEqual("Fizz");
    expect(lines[3]).toEqual("4");
    expect(lines[4]).toEqual("Buzz");
    expect(lines[5]).toEqual("Fizz");
    expect(lines[6]).toEqual("7");
    expect(lines[7]).toEqual("8");
    expect(lines[8]).toEqual("Fizz");
    expect(lines[9]).toEqual("Buzz");
    expect(lines[10]).toEqual("11");
    expect(lines[11]).toEqual("Fizz");
    expect(lines[12]).toEqual("13");
    expect(lines[13]).toEqual("14");
    expect(lines[14]).toEqual("FizzBuzz");
    expect(lines[15]).toEqual("16");

    done();
});
