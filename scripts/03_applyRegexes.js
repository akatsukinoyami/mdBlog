// scripts/applyRegexes.js
import { readdir, readFile, writeFile } from 'fs/promises';
import { join, extname } from 'path';

const rules = [
  [/[ ]*<figure>\n[ ]*<img src="(.+?)" alt="" \/>[ ]*\n[ ]*<\/figure>/g, '  ![]($1)' ],
  [/[ ]*<figure>\n[ ]*<img src="(.+?)" alt="(.+?)" \/>[ ]*\n[ ]*<\/figure>/g, '  ![$2]($1)' ],
  [/    <figcaption>(.+?)<\/figcaption>/g, ''],
  [/<div class="grid grid-cols-(\d)">([\s\S])<\/div>/g, '%%%$1$2%%%'],
  [/_(\d{4}\.\d{2}\.\d{2}(?: \d{2}:\d{2})?)_ /g, "##### $1\n\n "],
  [/_(\d{2}:\d{2})_ /g, "###### $1\n\n "]
];

function shouldProcess(filePath) {
  const ext = extname(filePath).toLowerCase();
  return ext === '.md' || ext === '.txt' || ext === '.html'; 
  // адаптируйте под свои нужды
}

function applyAll(text) {
  return rules.reduce(
    (acc, [pattern, replacement]) => acc.replaceAll(pattern, replacement),
    text
  );
}

async function processDir(dirPath) {
  const entries = await readdir(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dirPath, entry.name);

    if (entry.isDirectory()) {
      await processDir(fullPath);
    } else if (entry.isFile() && shouldProcess(fullPath)) {
      let content = await readFile(fullPath, 'utf8');
      const updated = applyAll(content);

      // записываем только если что-то поменялось
      if (updated !== content) {
        await writeFile(fullPath, updated, 'utf8');
        console.log(`✔ Применено к ${fullPath}`);
      }
    }
  }
}

(async () => {
  const targetDir = process.argv[2];
  if (!targetDir) {
    console.error('Usage: node applyRegexes.js <путь_к_папке>');
    process.exit(1);
  }

  try {
    await processDir(targetDir);
    console.log('Готово.');
  } catch (err) {
    console.error('Ошибка обработки:', err);
  }
})();
