# WebAssembly by Hand

A little experiment with hand writing [WebAssembly](http://webassembly.org/) using s-expression syntax (.wat).

The project is organized as a test suite that demonstrates different aspects of the WebAssembly syntax.

# Run the test suite with annotated examples

    git clone https://github.com/rhmoller/wasm-by-hand.git
    cd wasm-by-hand
    npm install
    npm test

And you should see a report like this

    PASS  src/fizzbuzz.test.ts
     ✓ Prints fizzbuzz (139ms)
    
    PASS  src/control-flow.test.ts
     control flow
       ✓ loops from 0 to 9 (4ms)
       ✓ counts from 0 to 5 (6ms)
       ✓ demonstrates if-then-else (2ms)
    
    PASS  src/wat-tag.test.ts
     wat-tag
       ✓ Compiles an empty module (65ms)
       ✓ Compiles the square function (81ms)
       ✓ counts to 5 (73ms)
    
    PASS  src/wasm-by-hand.test.ts
     ✓ compiles empty module (10ms)
     ✓ squares the input number (20ms)
     ✓ counter increments number for each invocation (21ms)
     ✓ exports the global constant (7ms)
     ✓ Writes a string to memory (7ms)

# Learn more about WebAssembly

Mozilla has a great introduction to the format here [Understanding WebAssembly text format](https://developer.mozilla.org/en-US/docs/WebAssembly/Understanding_the_text_format)

# References

* https://webassembly.github.io/spec/core/text/index.html - specification for the WAT format
* https://developer.mozilla.org/en-US/docs/WebAssembly/Understanding_the_text_format - explains the .wat format
* https://hacks.mozilla.org/2017/02/a-cartoon-intro-to-webassembly/ - great introduction to the concepts
* http://webassembly.org/docs/semantics/
* https://github.com/WebAssembly/testsuite - useful examples can be found in the test suite
    * https://github.com/WebAssembly/testsuite/blob/master/func.wast - function syntax
    * https://github.com/WebAssembly/testsuite/blob/master/i32.wast - functions wrapping i32 operations
    * https://github.com/WebAssembly/testsuite/blob/master/i64.wast - functions wrapping i64 operations
* http://webassembly.org/getting-started/js-api/
* http://cultureofdevelopment.com/blog/build-your-first-thing-with-web-assembly/
* http://blog.golovin.in/how-to-start-using-webassembly-today/
* https://gist.github.com/yurydelendik/4eeff8248aeb14ce763e - using webassembly with LLVM
* https://rsms.me/wasm-intro
* http://blog.mikaellundin.name/2016/06/19/creating-a-webassembly-binary-and-running-it-in-a-browser.html
