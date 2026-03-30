#!/usr/bin/env bun

import { readdir } from "fs/promises";
import { join, resolve } from "path";

const getKeys = (obj: Record<string, any>, prefix = ""): string[] =>
  Object.entries(obj).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    return typeof value === "object" && !Array.isArray(value)
      ? [path, ...getKeys(value, path)]
      : [path];
  });

const loadLocale = async (file: string) => (await import(resolve(file))).default;

const localesDir = resolve(process.cwd(), "src/lib/i18n");
const localeFiles = (await readdir(localesDir))
  .filter((f) => (f.endsWith(".ts") || f.endsWith(".js")) && !f.includes("index"))
  .map((f) => join(localesDir, f));

if (localeFiles.length < 2) {
  console.log("❌ Нужно минимум 2 файла");
  process.exit(1);
}

const locales = await Promise.all(
  localeFiles.map(async (f) => ({
    name: f.split("/").pop()!.replace(/\.(ts|js)$/, ""),
    keys: new Set(getKeys(await loadLocale(f))),
  })),
);

const [reference, ...others] = locales;

const errors = others.filter((locale) => {
  const missing = [...reference.keys].filter((k) => !locale.keys.has(k));
  const extra = [...locale.keys].filter((k) => !reference.keys.has(k));

  if (missing.length || extra.length) {
    console.log(`❌ ${locale.name}:`);
    missing.forEach((k) => console.log(`  - ${k}`));
    extra.forEach((k) => console.log(`  + ${k}`));
    return true;
  }

  console.log(`✅ ${locale.name}`);
  return false;
});

if (errors.length) {
  console.log(`\n❌ ${errors.length} файлов с ошибками`);
  process.exit(1);
}

console.log("\n✅ Все файлы валидны");
