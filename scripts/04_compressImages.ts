import { Glob } from "bun";
import { mkdir } from "node:fs/promises";
import { dirname, join, basename } from "node:path";

const imageExtensions = ["jpg", "jpeg", "png", "webp", "avif"];
const maxSize = 512;

// Проверяем доступность Sharp
let sharp: any;
try {
  sharp = (await import("sharp")).default;
} catch {
  console.error("Sharp not installed. Install it with: bun add sharp");
  process.exit(1);
}

// Найти все картинки в папках +images
const imageGlob = new Glob(
  `static/**/*+images/*.{${imageExtensions.join(",")}}`,
);
const imageFiles = await Array.fromAsync(imageGlob.scan("."));

console.log(`Found ${imageFiles.length} images in +images folders`);

// Группировать файлы по папкам для создания compressed папок
const directoriesMap = new Map<string, string[]>();

imageFiles.forEach((filePath) => {
  const dir = dirname(filePath);
  if (!directoriesMap.has(dir)) {
    directoriesMap.set(dir, []);
  }
  directoriesMap.get(dir)!.push(filePath);
});

console.log(`Processing ${directoriesMap.size} directories`);

await Promise.all(
  Array.from(directoriesMap.entries()).map(async ([imagesDir, files]) => {
    const compressedDir = imagesDir.replace("+images", "+imagesCompressed");
    console.log(`Processing directory: ${imagesDir} → ${compressedDir}`);

    // Создать папку +imagesCompressed
    try {
      await mkdir(compressedDir, { recursive: true });
    } catch (err) {
      console.error(`Failed to create directory ${compressedDir}:`, err);
      return;
    }

    await Promise.all(
      files.map(async (imagePath) => {
        try {
          const fileName = basename(imagePath);
          const outputPath = join(compressedDir, `${fileName}.webp`);

          // Обработать изображение с Sharp
          await sharp(imagePath)
            .resize(maxSize, maxSize, {
              fit: "inside",
              withoutEnlargement: true,
            })
            .webp({ quality: 75 })
            .toFile(outputPath);

          console.log(`Compressed: ${imagePath} → ${outputPath}`);
        } catch (err) {
          console.error(`Error processing ${imagePath}:`, err);
        }
      }),
    );
  }),
);

console.log("Image compression completed!");
