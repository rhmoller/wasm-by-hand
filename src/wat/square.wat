;; exports function square() that multiplies the input number with itself
(module
    (func (export "square") (param $i i32) (result i32)
        local.get $i
        local.get $i
        i32.mul
    )

    (func (export "square_alt_syntax") (param $i i32) (result i32)
        (i32.mul
            (local.get $i)
            (local.get $i)
        )
    )
)