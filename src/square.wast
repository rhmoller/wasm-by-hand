;; exports function square() that multiplies the input number with itself
(module
    (func (export "square") (param $i i32) (result i32)
        (i32.mul (get_local $i) (get_local $i))
    )
)