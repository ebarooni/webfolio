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
  {
    files: [
      "src/app/app.ts",
      "src/app/blog/blog.ts",
      "src/app/contact/contact-form/contact-form.ts",
      "src/app/contact/contact.ts",
      "src/app/contact/modal/modal.ts",
      "src/app/home/scroll-indicator/scroll-indicator.ts",
      "src/app/home/timeline/checkmark/checkmark.ts",
      "src/app/projects/projects.ts",
      "src/app/projects/showcase/project-item/project-item.ts",
      "src/app/projects/showcase/showcase.ts",
      "src/app/shared/components/hero/hero.ts",
    ],
    rules: {
      // The Angular 22 migration sets Eager so these components keep the old default.
      "@angular-eslint/prefer-on-push-component-change-detection": "off",
    },
  },
]);
