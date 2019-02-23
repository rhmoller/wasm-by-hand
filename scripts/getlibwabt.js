// downloads the latest version of libwabt.js from the WABT project

const fs = require("fs");
const https = require("https");
const path = require("path");

const URL = "https://raw.githubusercontent.com/WebAssembly/wabt/master/demo/libwabt.js";
const filePath = path.resolve(__dirname, "..", "src", "libwabt.js");
const fileStream = fs.createWriteStream(filePath);

https.get(URL, (res) => {
    res.on('data', (d) => {
        fileStream.write(d);
    }).on("end", () => {
        fileStream.end();
        console.log("Downloaded libwabt.js to src dir")
    });
}).on('error', (e) => {
    console.error("Unable to download libwabt.js", e);
});

