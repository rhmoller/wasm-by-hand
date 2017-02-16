# WebAssembly by Hand

A little experiment with hand writing [WebAssembly](http://webassembly.org/) using s-expression syntax (.wast).

Requires a browser with support for WebAssembly version 0xd or later. For example Firefox Developer Edition version 53
with the `javascript.options.wasm` and `javascript.options.wasm_baselinejit` flags enabled.

# Run It

    git clone https://github.com/rhmoller/wasm-by-hand.git
    cd wasm-by-hand
    npm install
    npm start
    
Then open http://localhost:8080 in your browser

# References

There is no spec for the s-expression version of WebAssembly, but these resources have turned out helpful:

* https://github.com/WebAssembly/testsuite
* http://webassembly.org/getting-started/js-api/
* http://cultureofdevelopment.com/blog/build-your-first-thing-with-web-assembly/

