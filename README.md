# WebAssembly by Hand

A little experiment with hand writing [WebAssembly](http://webassembly.org/) using s-expression syntax (.wast).

Requires a browser with support for WebAssembly version 0xd or later. For example Firefox Developer Edition version 53
with the `javascript.options.wasm` and `javascript.options.wasm_baselinejit` flags enabled.

# Run It

    git clone https://github.com/rhmoller/wasm-by-hand.git
    cd wasm-by-hand
    npm install
    npm start

Then open http://localhost:8080/_specRunner.html in your browser

# References

* https://hacks.mozilla.org/2017/02/a-cartoon-intro-to-webassembly/
* https://developer.mozilla.org/en-US/docs/WebAssembly/Understanding_the_text_format
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