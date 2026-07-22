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
const dependencyFields = ["dependencies", "devDependencies"];

function getDependencyRange(dependency) {
  const separatorIndex = dependency.lastIndexOf("@");

  return separatorIndex > 0 ? dependency.slice(separatorIndex + 1) : "";
}

for (const item of registry.items ?? []) {
  if (names.has(item.name)) {
    throw new Error(`Duplicate registry item: ${item.name}`);
  }
  names.add(item.name);

  for (const field of dependencyFields) {
    for (const dependency of item[field] ?? []) {
      if (!getDependencyRange(dependency).startsWith("^")) {
        throw new Error(
          `${item.name}:${field} must use a caret range: ${dependency}`,
        );
      }
    }
  }

  for (const file of item.files ?? []) {
    const absoluteFilePath = resolve(root, file.path);
    await stat(absoluteFilePath);

    if (file.type === "registry:file" && !file.target) {
      throw new Error(`${item.name}:${file.path} requires a target`);
    }

    if (file.target?.startsWith("~/src/")) {
      throw new Error(
        `${item.name}:${file.path} must not install application source`,
      );
    }

    const featureExampleRoot =
      "skills/manage-react-server-state/examples/feature-colocated/src/features/";

    if (
      file.path.startsWith(featureExampleRoot) &&
      !file.path.startsWith(`${featureExampleRoot}posts/`)
    ) {
      throw new Error(
        `${item.name}:${file.path} is outside the canonical Posts example`,
      );
    }

    if (file.path.toLowerCase().includes("stream")) {
      throw new Error(`${item.name}:${file.path} must not publish a stream example`);
    }
  }
}

if (
  names.size !== 1 ||
  !names.has("manage-react-server-state")
) {
  throw new Error(
    "The registry must publish only the manage-react-server-state skill",
  );
}

await stat(resolve(root, ".github/workflows/release-skill.yml"));

const releaseConfigPath = resolve(root, ".releaserc.json");
const releaseConfig = JSON.parse(await readFile(releaseConfigPath, "utf8"));

if (
  !releaseConfig.branches?.includes("main") ||
  releaseConfig.tagFormat !== "manage-react-server-state-v${version}"
) {
  throw new Error("semantic-release branch or tag format is invalid");
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
