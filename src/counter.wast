;; returns an incrementing number for each invocation
;;
;; Created by compiling this C program
;;
;; int c = 0;
;; int count() {
;;  return c++;
;; }
;;
;; with
;;
;; clang -emit-llvm --target=wasm32 -Oz src/counter.c -c -o counter.bc
;; llc -asm-verbose=false -o counter.s counter.bc
;; s2wasm counter.s > counter.wast
;;
;; and hand-tweaking it a bit

(module
  (memory 1 2)
  (func (export "count") (result i32)
    (local $0 i32)
    (i32.store offset=12
      (i32.const 0)
      (i32.add
        (tee_local $0
          (i32.load offset=12
            (i32.const 0)
          )
        )
        (i32.const 1)
      )
    )
    (get_local $0)
  )
)
