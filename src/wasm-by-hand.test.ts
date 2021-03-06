import { compileAndInstantiate, decodeWasmString } from "./wasm-util";

interface SquareInstance {
  exports: {
    square: (value: number) => number;
    square_alt_syntax: (value: number) => number;
  }
}

interface CounterInstance {
  exports: {
    count: () => number;
  }
}

interface ConstantInstance {
  exports: {
    answer: WebAssembly.Global;
  }
}

interface WriteStringInstance {
  exports: {
    writeMessage: () => void;
  }
}

it("compiles empty module", async () => {
  const instance = await compileAndInstantiate("empty.wat");

  expect(instance.exports).toEqual({});
});

it("squares the input number", async () => {
  const instance = await compileAndInstantiate<SquareInstance>("square.wat");

  expect(instance.exports.square(2)).toEqual(4);
  expect(instance.exports.square(3)).toEqual(9);
  expect(instance.exports.square(4)).toEqual(16);

  expect(instance.exports.square_alt_syntax(2)).toEqual(4);
  expect(instance.exports.square_alt_syntax(3)).toEqual(9);
  expect(instance.exports.square_alt_syntax(4)).toEqual(16);
});

it("counter increments number for each invocation", async () => {
  const instance = await compileAndInstantiate<CounterInstance>("counter.wat");

  let count = instance.exports.count();
  expect(count).toEqual(0);

  count = instance.exports.count();
  expect(count).toEqual(1);

  count = instance.exports.count();
  expect(count).toEqual(2);
});

it("exports the global constant", async () => {
  const instance = await compileAndInstantiate<ConstantInstance>("constant.wat");

  const answer = instance.exports.answer;

  // a change was squeezed into the WebAssembly spec after MVP release
  // old behaviour: represent export as JS number
  // new behaviour: box number in a WebAssembly.Global

  expect(answer.value).toEqual(42);
});

it("Writes a string to memory", async done => {
  const lines: Array<string> = [];
  const memory = new WebAssembly.Memory({ initial: 1 });
  const instance = await compileAndInstantiate<WriteStringInstance>("writeString.wat", {
    js: {
      memory,
      println: (offset: number, length: number) => {
        const string = decodeWasmString(memory, offset, length);
        lines.push(string);
      }
    }
  });

  instance.exports.writeMessage();
  expect(lines.length).toEqual(1);
  expect(lines[0]).toEqual("Hello from WebAssembly");

  done();
});
