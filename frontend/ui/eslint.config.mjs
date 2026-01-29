// @ts-check

import config from "@ebarooni/eslint-config";
import tseslint from "typescript-eslint";

export default tseslint.config(
  ...config.angular,
  config.json,
  config.markdown,
  {
    ignores: [".angular", ".vscode", "dist"],
  },
  {
    files: ["src/**/*"],
    languageOptions: {
      parserOptions: {
        project: ["tsconfig.eslint.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ["functions/**"],
    languageOptions: {
      parserOptions: {
        project: ["functions/tsconfig.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ["**/*.ts"],
    rules: {
      "@typescript-eslint/no-extraneous-class": "off",
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        {
          allowNumber: true,
        },
      ],
    },
  },
);
