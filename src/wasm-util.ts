import path from "path";
import fs from "fs";
import util from "util";
import { fileURLToPath } from "url";
import Imports = WebAssembly.Imports;

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

// Lazy initialization of wabt module
let wabt: any = null;

async function getWabt() {
  if (!wabt) {
    const wabtModule = await import("./libwabt.js");
    wabt = await wabtModule.default();
  }
  return wabt;
}

export async function compileAndInstantiate<T extends WebAssembly.Instance>(
  watFile: string,
  imports: Imports = {},
): Promise<T> {
  const wabt = await getWabt();
  const pathToWatFile = path.resolve(_dirname, "wat", watFile);
  const watBuffer = fs.readFileSync(pathToWatFile, { encoding: "utf-8" });
  const parsed = wabt.parseWat(watFile, watBuffer);
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

export async function wat(strings: TemplateStringsArray, ...values: any[]) {
  const wabt = await getWabt();
  let str = "";
  strings.forEach((string, i) => {
    str += string;
    const value = values[i];
    if (typeof value !== "undefined") {
      str += value;
    }
  });

  const parsed = wabt.parseWat("<src>", str);
  parsed.validate();
  const binaryOutput = parsed.toBinary({ log: true, write_debug_names: true });
  const buffer = binaryOutput.buffer;
  return WebAssembly.compile(buffer);
}
