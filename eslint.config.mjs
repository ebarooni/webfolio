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
    languageOptions: {
      parserOptions: {
        project: ["tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
);
