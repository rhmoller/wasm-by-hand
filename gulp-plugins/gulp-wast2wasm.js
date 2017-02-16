const wast2wasm = require("wast2wasm");
const gutil = require("gulp-util");
const through = require("through2");

module.exports = function(label) {

    function compile(file, enc, cb) {
        if (file.isNull()) {
            cb(null, file);
            return;
        }

        if (file.isStream()) {
            cb(new gutil.Error("gulp-wast2wasm", "Streaming not supported"));
            return;
        }

        const wast = file.contents.toString();
        wast2wasm(wast, true).then(out => {
            file.contents = new Buffer(out.buffer);
            file.path = gutil.replaceExtension(file.path, ".wasm");
            cb(null, file);
        });
    }

    return through.obj(compile);
};