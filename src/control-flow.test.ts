import { compileAndInstantiate } from "./wasm-util";

describe("control flow", () => {
  const log: Array<number> = [];
  let instance: WebAssembly.Instance;

  beforeAll(async () => {
    instance = await compileAndInstantiate("controlflow.wat", {
      imports: {
        trace: (i: any) => log.push(i)
      }
    });
  });

  beforeEach(() => {
    log.length = 0;
  });

  it("loops from 0 to 9", async () => {
    const loop = instance.exports.loop as Function;
    loop();

    expect(log).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it("counts from 0 to 5", async done => {
    const countTo = instance.exports.countTo as Function;
    countTo(5);
    expect(log).toEqual([0, 1, 2, 3, 4]);
    done();
  });

  it("demonstrates if-then-else", async done => {
    const ifThenElse = instance.exports.if_then_else as Function;
    ifThenElse(0);
    expect(log).toEqual([3]);

    log.length = 0;

    ifThenElse(1);
    expect(log).toEqual([5]);

    done();
  });
});
