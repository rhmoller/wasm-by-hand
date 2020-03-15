import {compileAndInstantiate} from "./wasm-util";

interface ControlFlowInstance {
  exports: {
    loop: Function;
    countTo: Function;
    if_then_else: Function;
  }
}

describe("control flow", () => {
  const log: Array<number> = [];
  let instance: ControlFlowInstance;

  beforeAll(async () => {
    instance = await compileAndInstantiate<ControlFlowInstance>("controlflow.wat", {
      imports: {
        trace: (i: any) => log.push(i)
      }
    });
  });

  beforeEach(() => {
    log.length = 0;
  });

  it("loops from 0 to 9", async () => {
    instance.exports.loop();

    expect(log).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it("counts from 0 to 5", async done => {
    instance.exports.countTo(5);
    expect(log).toEqual([0, 1, 2, 3, 4]);
    done();
  });

  it("demonstrates if-then-else", async done => {
    instance.exports.if_then_else(0);
    expect(log).toEqual([3]);

    log.length = 0;

    instance.exports.if_then_else(1);
    expect(log).toEqual([5]);

    done();
  });
});
