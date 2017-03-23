;; exports a function that loops from 0 to 9 and calls trace for each value
(module
    ;; import trace function that accepts a single i32 argument
    (func $t (import "imports" "trace") (param i32))
    (memory 1)
    (func (export "loop")
        (local $i i32)
        (set_local $i (i32.const 0))
        (block $end
            (loop $start
                (br_if $end
                    (i32.eq
                        (get_local $i)
                        (i32.const 10)
                    )
                )
                (call $t
                    (get_local $i)
                )
                (set_local $i
                    (i32.add
                        (get_local $i)
                        (i32.const 1)
                    )
                )
                (br $start)
            )
        )
    )
)