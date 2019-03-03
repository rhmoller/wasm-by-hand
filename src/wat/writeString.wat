(module
    (import "js" "memory" (memory 1))
    (import "js" "println" (func $println (param i32 i32)))
    (data (i32.const 0) "Hello from WebAssembly")
    (func (export "writeMessage")
        i32.const 0
        i32.const 22
        call $println
    )
)
