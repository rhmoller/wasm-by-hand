import { wat } from "./wasm-util";
import Module = WebAssembly.Module;

describe("wat-tag", () => {
  it("Compiles an empty module", async () => {
    const module = await wat`(module)`;
    const instance = WebAssembly.instantiate(module);
    expect(instance).not.toBe(null);
  });

  it("Compiles the square function", async () => {
    const module: Module = await wat`
            (module
                (func (export "square") (param $i i32) (result i32)
                    local.get $i
                    local.get $i
                    i32.mul
                )
            )
        `;
    const instance = await WebAssembly.instantiate(module);

    expect(instance).not.toBe(null);
    const square = instance.exports.square as Function;
    expect(square(3)).toBe(9);
  });

  it("counts to 5", async () => {
    const module = await wat`
            (module
                ;; import trace function that accepts a single i32 argument
                (func $trace (import "js" "trace") (param i32))
                
                ;; prints numbers from 1 to $max
                (func (export "countTo") (param $max i32)
                    ;; define variable $c and initialize it to 0
                    (local $c i32)
                    (local.set $c (i32.const 0))
            
                    ;; start a loop
                    (loop $counting
                        ;; increment $c by 1
                        (local.set $c (i32.add (local.get $c) (i32.const 1)))
                        ;; log current value of $c
                        (call $trace (local.get $c))
                        ;; repeat loop if $c is not equal to $max
                        (br_if $counting (i32.ne (local.get $max) (local.get $c)))
                    )
                )
            )
        `;

    const log: Array<number> = [];
    const instance = await WebAssembly.instantiate(module, {
      js: {
        trace: (i: number) => log.push(i),
      },
    });

    const countTo = instance.exports.countTo as Function;
    countTo(5);
    expect(log).toEqual([1, 2, 3, 4, 5]);
  });
});
