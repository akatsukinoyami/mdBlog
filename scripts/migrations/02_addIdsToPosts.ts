#!/usr/bin/env bun

import { readdir, readFile, writeFile, stat } from "node:fs/promises";
import { join } from "node:path";
import { parse, stringify } from "yaml";
import { randomUUID } from "node:crypto";

async function findYamlFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir);

  const results = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = join(dir, entry);
      const stats = await stat(fullPath);

      if (stats.isDirectory()) return findYamlFiles(fullPath);

      return entry === "index.yaml" ? [fullPath] : [];
    }),
  );

  return results.flat();
}

async function processYamlFile(filePath: string): Promise<boolean> {
  try {
    const content = await readFile(filePath, "utf8");
    const data = parse(content);

    if (!data?.id) {
      data.id = randomUUID();
      await writeFile(filePath, stringify(data), "utf8");
      console.log(`✓ Added ID to ${filePath}`);
      return true;
    }

    console.log(`- Skipped ${filePath} (ID exists)`);
    return false;
  } catch (error) {
    console.error(`✗ Error processing ${filePath}:`, error.message);
    return false;
  }
}

async function main(): Promise<void> {
  const startDir = process.argv[2] || ".";

  console.log(`Searching for index.yaml files in: ${startDir}`);

  const yamlFiles = await findYamlFiles(startDir);

  if (yamlFiles.length === 0) {
    console.log("No index.yaml files found");
    return;
  }

  console.log(`Found ${yamlFiles.length} files to process\n`);

  const results = await Promise.all(yamlFiles.map(processYamlFile));
  const updated = results.filter(Boolean).length;

  console.log(`\nProcessed ${yamlFiles.length} files, updated ${updated}`);
}

await main();
