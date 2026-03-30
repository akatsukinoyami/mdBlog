import { Glob } from "bun";
import { mkdir } from "node:fs/promises";
import { dirname, join, basename } from "node:path";

const imageExtensions = ["jpg", "jpeg", "png", "webp", "avif"];
const maxSize = 512;

let sharp: any;
try {
  sharp = (await import("sharp")).default;
} catch {
  console.error("Sharp not installed. Install it with: bun add sharp");
  process.exit(1);
}

const imageGlob = new Glob(
  `static/**/*+images/*.{${imageExtensions.join(",")}}`,
);
const imageFiles = await Array.fromAsync(imageGlob.scan("."));

const directoriesMap = new Map<string, string[]>();
for (const filePath of imageFiles) {
  const dir = dirname(filePath);
  const existing = directoriesMap.get(dir);
  if (existing) existing.push(filePath);
  else directoriesMap.set(dir, [filePath]);
}

let compressed = 0;
let skipped = 0;
let errors = 0;

await Promise.all(
  Array.from(directoriesMap.entries()).map(async ([imagesDir, files]) => {
    const compressedDir = imagesDir.replace("+images", "+imagesCompressed");

    try {
      await mkdir(compressedDir, { recursive: true });
    } catch (err) {
      console.error(`Failed to create directory ${compressedDir}:`, err);
      errors += files.length;
      return;
    }

    await Promise.all(
      files.map(async (imagePath) => {
        try {
          const outputPath = join(compressedDir, `${basename(imagePath)}.webp`);
          if (await Bun.file(outputPath).exists()) {
            skipped++;
            return;
          }
          await sharp(imagePath)
            .resize(maxSize, maxSize, { fit: "inside", withoutEnlargement: true })
            .webp({ quality: 75 })
            .toFile(outputPath);
          compressed++;
        } catch (err) {
          console.error(`Error processing ${imagePath}:`, err);
          errors++;
        }
      }),
    );
  }),
);

console.log(`Image compression done:
  Compressed: ${compressed}
  Skipped:    ${skipped}
  Errors:     ${errors}
  Total:      ${imageFiles.length}
`);
