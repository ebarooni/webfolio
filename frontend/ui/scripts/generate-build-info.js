const fs = require("node:fs");
const path = require("node:path");

const packageJsonPath = path.join(__dirname, "..", "package.json");
const outputPath = path.join(
  __dirname,
  "..",
  "src",
  "environments",
  "build-info.ts",
);

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

const buildInfo = {
  version: process.env.APP_VERSION ?? "unknown",
  buildTime: process.env.BUILD_TIME ?? new Date().toISOString(),
  dependencies: packageJson.dependencies ?? {},
  devDependencies: packageJson.devDependencies ?? {},
};

const fileContent = `export const BUILD_INFO = ${JSON.stringify(buildInfo, null, 2)} as const;\n`;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, fileContent, "utf8");
