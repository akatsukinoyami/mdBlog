import { Glob, gzipSync } from "bun";
import { brotliCompressSync } from "node:zlib";

const extensions = ["cjs", "mjs", "js", "json", "yaml", "yml", "html", "css"];
const compressors = [
  [gzipSync, ".gz"],
  [brotliCompressSync, ".br"],
] as const;

await Promise.all(
  compressors.map(async ([compressFunction, extension]) => {
    console.log(`Compressing bundle with ${extension}`);

    const glob = new Glob(`build/**/*.{${extensions.join(",")}}`);
    const files = await Array.fromAsync(glob.scan("."));

    await Promise.all(
      files.map(async (filepath: string) => {
        try {
          const content = await Bun.file(filepath).arrayBuffer();
          const compressed = compressFunction(new Uint8Array(content));
          await Bun.write(filepath + extension, compressed);
        } catch (err) {
          console.error(`Error compressing ${filepath}:`, err);
          process.exitCode = 1;
        }
      }),
    );
  }),
);
