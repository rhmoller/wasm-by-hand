(module
    ;; import trace function that accepts a single i32 argument
    (func $trace (import "imports" "trace") (param i32))
    (memory 1)

    (func (export "loop")
        (local $i i32)
        (local.set $i (i32.const 0))
        (block $end
            (loop $start
                (br_if $end
                    (i32.eq
                        (local.get $i)
                        (i32.const 10)
                    )
                )
                (call $trace
                    (local.get $i)
                )
                (local.set $i
                    (i32.add
                        (local.get $i)
                        (i32.const 1)
                    )
                )
                (br $start)
            )
        )
    )

    ;; prints numbers from 0 to $max (not including $max)
    (func (export "countTo") (param $max i32)
        ;; define variable $c and initialize it to 0
        (local $c i32)
        (local.set $c (i32.const 0))

        ;; start a loop
        (loop $counting
            ;; print current value of $c
            (call $trace (local.get $c))
            ;; increment $c by 1
            (local.set $c (i32.add (local.get $c) (i32.const 1)))
            ;; repeat loop if $c is not equal to $max
            (br_if $counting (i32.ne (local.get $max) (local.get $c)))
        )
    )

    ;; returns 3 if $i is 0, otherwise it will return 5
    (func (export "if_then_else") (param $i i32)
        (if (i32.eq (local.get $i) (i32.const 0))
            (then (call $trace (i32.const 3)))
            (else (call $trace (i32.const 5)))
        )
    )

)
