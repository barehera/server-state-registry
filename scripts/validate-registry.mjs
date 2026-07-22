import { readFile, stat } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const registryPath = resolve(root, "registry.json");
const registry = JSON.parse(await readFile(registryPath, "utf8"));

if (registry.$schema !== "https://ui.shadcn.com/schema/registry.json") {
  throw new Error("registry.json must use the official shadcn schema");
}

const names = new Set();

for (const item of registry.items ?? []) {
  if (names.has(item.name)) {
    throw new Error(`Duplicate registry item: ${item.name}`);
  }
  names.add(item.name);

  for (const file of item.files ?? []) {
    await stat(resolve(root, file.path));

    if (file.type === "registry:file" && !file.target) {
      throw new Error(`${item.name}:${file.path} requires a target`);
    }
  }
}

const skillPath = resolve(
  root,
  "skills/manage-react-server-state/SKILL.md",
);
const skill = await readFile(skillPath, "utf8");

if (skill.includes("TODO")) {
  throw new Error("The Agent Skill still contains TODO placeholders");
}

if (!skill.startsWith("---\nname: manage-react-server-state\n")) {
  throw new Error("The Agent Skill frontmatter is missing or invalid");
}

console.log(
  `Validated ${names.size} registry items and the manage-react-server-state skill.`,
);
