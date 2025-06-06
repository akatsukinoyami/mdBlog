#!/usr/bin/env node
// Пример использования: node transformMd.js input.md output.md

import fs from "fs/promises";
import path from "path";

/**
 * Преобразует блоки Markdown-таблиц в HTML-grid:
 *  - Считает количество колонок по первой строке таблицы.
 *  - Пропускает строку-разделитель (вторая строка).
 *  - Оборачивает все оставшиеся ячейки в <div> внутри контейнера:
 *      <div class="grid grid-cols-{N}">
 *        <div>ячейка1</div>
 *        <div>ячейка2</div>
 *        ...
 *      </div>
 */
function transformTables(content) {
  // Регулярное выражение ловит:
  //   1) строку, начинающуюся и заканчивающуюся |...|
  //   2) сразу после — строку-сепаратор из -, :, пробелов и |
  //   3) одну или более строк с |...|
  const tableRegex =
    /((?:\|.*\|\r?\n)(?:\|[\s\-:|]+\|\r?\n)(?:\|.*\|\r?\n?)*)/g;

  return content.replace(tableRegex, (match) => {
    // Разбиваем блок по строкам и убираем пустые в конце
    const lines = match
      .trimEnd()
      .split(/\r?\n/)
      .filter((l) => l.trim() !== "");
    if (lines.length < 2) {
      // Если вдруг невалидно, возвращаем исходный фрагмент
      return match;
    }

    // Строка с заголовками (или первая строка таблицы)
    const headerLine = lines[0];
    // Количество колонок = количество "столбцов" между |,
    // игнорируя первый и последний пустые сегменты
    const cols = headerLine
      .split("|")
      .slice(1, -1) // вырезаем пустые сегменты с краёв
      .map((cell) => cell.trim()).length;

    // Собираем массив всех ячеек, пропуская строку-сепаратор (index 1)
    const cells: string[] = [];
    for (let i = 0; i < lines.length; i++) {
      if (i === 1) continue; // пропускаем линию с --- | ---
      // Берём строку, чистим от начального и конечного "|", разбиваем по "|"
      const parts = lines[i]
        .slice(1, -1) // удалили первый и последний символ "|"
        .split("|")
        .map((cell) => cell.trim());
      parts.forEach((txt: string) => cells.push(txt));
    }

    // Генерируем HTML-вывод
    const opening = `<div class="grid grid-cols-${cols}">`;
    const cellDivs = cells.map((txt) => `  <div>${txt}</div>`).join("\n");
    const closing = `</div>`;

    return [opening, cellDivs, closing].join("\n");
  });
}

/**
 * Оборачивает Markdown-изображения вида ![alt](url)
 * в HTML-<figure> с <img> и <figcaption>
 */
function transformImages(content) {
  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
  return content.replace(imageRegex, (_match, alt, src) => {
    const caption = alt.trim();
    return [
      `<figure>`,
      `  <img src="${src}" alt="${caption}" />`,
      caption ? `  <figcaption>${caption}</figcaption>` : "",
      `</figure>`,
    ].join("\n");
  });
}

async function main() {
  const [, , inputPath, outputPath] = process.argv;
  if (!inputPath || !outputPath) {
    console.error("Usage: node transformMd.js <input.md> <output.md>");
    process.exit(1);
  }

  try {
    const absIn = path.resolve(process.cwd(), inputPath);
    const absOut = path.resolve(process.cwd(), outputPath);

    let content = await fs.readFile(absIn, "utf-8");

    // Сначала преобразуем таблицы, затем — изображения
    content = transformTables(content);
    content = transformImages(content);

    await fs.writeFile(absOut, content, "utf-8");
    console.log(`Файл успешно преобразован и записан в ${outputPath}`);
  } catch (err) {
    console.error(`Ошибка: ${err.message}`);
    process.exit(1);
  }
}

main();
