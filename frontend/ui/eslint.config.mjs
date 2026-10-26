import defineEslintConfig from "@ebarooni/angular-eslint-config";

export default defineEslintConfig([
  {
    languageOptions: {
      parserOptions: {
        project: ["tsconfig.eslint.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  { ignores: [".angular"] },
]);
