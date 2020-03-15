import path from "path";
import fs from "fs";
import util from "util";
import Imports = WebAssembly.Imports;

const wabt = require("./libwabt")();

export async function compileAndInstantiate<T extends WebAssembly.Instance>(watFile: string, imports: Imports = {}): Promise<T> {
  const pathToWatFile = path.resolve("src", "wat", watFile);
  const watBuffer = fs.readFileSync(pathToWatFile, { encoding: "UTF-8" });
  const parsed = wabt.parseWat(watFile, watBuffer);
  parsed.resolveNames();
  parsed.validate();
  const binaryOutput = parsed.toBinary({ log: true, write_debug_names: true });
  const buffer = binaryOutput.buffer;
  const result = await WebAssembly.instantiate(buffer, imports);
  return result.instance as T;
}

export function decodeWasmString(memory: WebAssembly.Memory, offset: number, length: number) {
  const bytes = new Uint8Array(memory.buffer, offset, length);
  return new util.TextDecoder("utf-8").decode(bytes);
}

export function wat(strings: TemplateStringsArray, ...values: any[]) {
  let str = "";
  strings.forEach((string, i) => {
    str += string;
    const value = values[i];
    if (typeof value !== "undefined") {
      str += value;
    }
  });

  const parsed = wabt.parseWat("<src>", str);
  parsed.resolveNames();
  parsed.validate();
  const binaryOutput = parsed.toBinary({ log: true, write_debug_names: true });
  const buffer = binaryOutput.buffer;
  return WebAssembly.compile(buffer);
}
