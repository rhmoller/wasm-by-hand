// downloads the latest version of libwabt.js and libwabt.wasm from the WABT project

import fs from "fs";
import https from "https";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = "https://raw.githubusercontent.com/WebAssembly/wabt/main/docs/demo";
const SRC_DIR = path.resolve(__dirname, "..", "src");

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const fileStream = fs.createWriteStream(dest);
    https
      .get(url, (res) => {
        res.on("data", (d) => fileStream.write(d));
        res.on("end", () => {
          fileStream.end();
          resolve();
        });
      })
      .on("error", (e) => {
        fileStream.end();
        reject(e);
      });
  });
}

async function main() {
  try {
    await downloadFile(`${BASE_URL}/libwabt.js`, path.join(SRC_DIR, "libwabt.js"));
    console.log("Downloaded libwabt.js to src dir");

    await downloadFile(`${BASE_URL}/libwabt.wasm`, path.join(SRC_DIR, "libwabt.wasm"));
    console.log("Downloaded libwabt.wasm to src dir");
  } catch (e) {
    console.error("Error downloading libwabt files:", e);
    process.exit(1);
  }
}

main();
