import { Glob, gzipSync } from "bun";
import { brotliCompressSync } from "node:zlib";

const extensions = [
  "cjs",
  "mjs",
  "js",
  "json",
  "yaml",
  "yml",
  "md",
  "html",
  "css",
];
const compressors = [
  [gzipSync, ".gz"],
  [brotliCompressSync, ".br"],
] as const;

const glob = new Glob(`build/**/*.{${extensions.join(",")}}`);
const files = await Array.fromAsync(glob.scan("."));

await Promise.all(
  files.map(async (filepath: string) => {
    try {
      const content = new Uint8Array(await Bun.file(filepath).arrayBuffer());
      await Promise.all(
        compressors.map(([compressFunction, extension]) =>
          Bun.write(filepath + extension, compressFunction(content)),
        ),
      );
    } catch (err) {
      console.error(`Error compressing ${filepath}:`, err);
      process.exitCode = 1;
    }
  }),
);
