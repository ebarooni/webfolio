// @ts-check

import eb from "@ebarooni/eslint-config/angular-recommended-type-checked";
import tseslint from "typescript-eslint";

export default tseslint.config(
  ...eb,
  {
    languageOptions: {
      parserOptions: {
        project: ["**/tsconfig*.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  { ignores: [".angular/*"] },
);
