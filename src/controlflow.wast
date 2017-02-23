(module
    ;; import trace function that accepts a single i32 argument
    (func $t (import "imports" "trace") (param i32))

    (func (export "looping")
        i32.const 42
        call $t
    )
)