import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import YAML from "yaml";

const rootDir = process.argv[2] || process.cwd();

function traverse(dir: string): Record<string, unknown> {
  const idxPath = join(dir, "index.yaml");
  let node: Record<string, unknown> = {};

  if (existsSync(idxPath)) {
    try {
      node = YAML.parse(readFileSync(idxPath, "utf8"));
    } catch (err) {
      console.error(`Error parsing YAML in ${idxPath}:`, err);
      process.exit(1);
    }
  }

  const children: Record<string, unknown> = {};
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const childNode = traverse(join(dir, entry.name));
    if (Object.keys(childNode).length > 0) {
      children[entry.name] = childNode;
    }
  }

  if (Object.keys(children).length > 0) {
    node.children = children;
  }

  return node;
}

const tree = traverse(resolve(rootDir));
process.stdout.write(YAML.stringify(tree));
