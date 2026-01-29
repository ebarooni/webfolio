const path = require("path");
const fs = require("fs");
const dayjs = require("dayjs");
const packageJson = require("./package.json");

const version = packageJson.version;
const dependencies = packageJson.dependencies;
const devDependencies = packageJson.devDependencies;

const versionDirPath = path.join(__dirname, "src", "environments");
const versionFilePath = path.join(versionDirPath, "build-info.ts");

const src = `export const VERSION = '${version}';
export const BUILD_TIME = '${dayjs().toISOString()}';
export const DEPENDENCIES = ${JSON.stringify(dependencies, null, 2)};
export const DEV_DEPENDENCIES = ${JSON.stringify(devDependencies, null, 2)};
`;

function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Directory created: ${dirPath}`);
  }
}

function generateVersionFile() {
  try {
    ensureDirectoryExists(versionDirPath);

    fs.writeFileSync(versionFilePath, src, "utf8");
    console.log(`Version file created successfully at ${versionFilePath}`);
  } catch (err) {
    console.error(`Error creating version file: ${err}`);
    process.exit(1);
  }
}

generateVersionFile();
