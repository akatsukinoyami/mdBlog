#!/usr/bin/env bun

/**
 * Migration: ensure blank lines around ::: grid markers
 *
 * Fixes cases like:
 *   :::\n##### heading   →   :::\n\n##### heading
 *   content\n:::         →   content\n\n:::
 */

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const filesDir = join(import.meta.dir, '../../static/files');
const dryRun = process.argv.includes('--dry-run');

async function findPostFiles(dir: string): Promise<string[]> {
	const entries = await readdir(dir, { withFileTypes: true });
	const files: string[] = [];
	for (const entry of entries) {
		const full = join(dir, entry.name);
		if (entry.isDirectory()) files.push(...(await findPostFiles(full)));
		else if (entry.name.startsWith('+post.') && entry.name.endsWith('.md')) files.push(full);
	}
	return files;
}

function fixSpacing(src: string): string {
	return src
		// blank line after ::: / :::N / :::cN / :::rN if not already there
		.replace(/(^:::[^\n]*)\n(?!\n)/gm, '$1\n\n')
		// blank line before ::: if not already there
		.replace(/(?<!\n)\n(:::)/gm, '\n\n$1');
}

const files = await findPostFiles(filesDir);
let changed = 0;
let unchanged = 0;

for (const file of files) {
	const src = await readFile(file, 'utf8');
	const result = fixSpacing(src);

	if (result === src) { unchanged++; continue; }

	changed++;
	console.log(`Fixing: ${file.replace(filesDir + '/', '')}`);
	if (!dryRun) await writeFile(file, result, 'utf8');
}

console.log(`\nDone — fixed: ${changed}, unchanged: ${unchanged}${dryRun ? ' (dry run)' : ''}`);
