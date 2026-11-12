import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const REFERENCE_LANGUAGE = "en";

const localizationDirectory = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "src",
  "main",
  "resources",
  "i18n",
);

function readTranslations(fileName) {
  const filePath = join(localizationDirectory, fileName);

  return JSON.parse(readFileSync(filePath, "utf8"));
}

function collectEntries(node, prefix = "") {
  return Object.entries(node).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;

    if (value !== null && typeof value === "object") {
      return collectEntries(value, path);
    }

    return [[path, value]];
  });
}

function findProblems(language, entries, referenceKeys) {
  const keys = new Set(entries.map(([path]) => path));
  const missing = [...referenceKeys].filter((key) => !keys.has(key));
  const unknown = [...keys].filter((key) => !referenceKeys.has(key));
  const empty = entries
    .filter(([, value]) => typeof value !== "string" || value.trim() === "")
    .map(([path]) => path);

  return [
    ...missing.map((key) => `${language}: missing key "${key}"`),
    ...unknown.map((key) => `${language}: unknown key "${key}"`),
    ...empty.map((key) => `${language}: empty value for "${key}"`),
  ];
}

const languages = readdirSync(localizationDirectory)
  .filter((fileName) => fileName.endsWith(".json"))
  .map((fileName) => fileName.replace(/\.json$/, ""));

if (!languages.includes(REFERENCE_LANGUAGE)) {
  console.error(`The reference file ${REFERENCE_LANGUAGE}.json is missing.`);
  process.exit(1);
}

const referenceKeys = new Set(
  collectEntries(readTranslations(`${REFERENCE_LANGUAGE}.json`)).map(
    ([path]) => path,
  ),
);

const problems = languages.flatMap((language) =>
  findProblems(
    language,
    collectEntries(readTranslations(`${language}.json`)),
    referenceKeys,
  ),
);

if (problems.length > 0) {
  console.error(problems.join("\n"));
  process.exit(1);
}

console.log(
  `Localizations are consistent: ${languages.join(", ")} (${referenceKeys.size} keys).`,
);
