const gulp = require("gulp");
const wast2wasm = require("./gulp-plugins/gulp-wast2wasm");
const fs = require("fs");

gulp.task("wast2wasm", () => {
    gulp.src("src/*.wast")
        .pipe(wast2wasm())
        .pipe(gulp.dest("dist"));
});
