import { writeFile, mkdir, readFile } from "fs/promises";
import { resolve } from "path";

async function generateBuildInfo() {
  console.log("⌛ Generating build info...");

  try {
    const packageJsonPath = resolve(process.cwd(), "package.json");

    const packageJsonContent = await readFile(packageJsonPath, "utf8");
    const packageJson = JSON.parse(packageJsonContent);

    const version = packageJson.version;
    const deps = JSON.stringify(packageJson.dependencies, null, 2);
    const devDeps = JSON.stringify(packageJson.devDependencies, null, 2);

    const constantsDir = resolve(process.cwd(), "./src/constants");
    const buildInfoPath = resolve(constantsDir, "build-info.ts");

    await mkdir(constantsDir, { recursive: true });

    const content =
      `export const VERSION = '${version}';\n` +
      `export const BUILD_TIME = '${new Date().toISOString()}';\n` +
      `export const DEPS = ${deps};\n` +
      `export const DEV_DEPS = ${devDeps};\n`;

    await writeFile(buildInfoPath, content, "utf8");
    console.log(`✅ Build info has been written to ${buildInfoPath}`);
  } catch (error) {
    console.error(`❌ Error generating build info: ${error.message}`);
  }
}

void generateBuildInfo();
