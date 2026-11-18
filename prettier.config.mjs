import sharedConfig from "@ebarooni/prettier-config";

/** @type {import("prettier").Config} */
export default {
  ...sharedConfig,
  overrides: [
    ...(sharedConfig.overrides ?? []),
    // Angular 20+ names templates "name.html", not "name.component.html".
    // Without this override, Prettier reads them as plain HTML and does not understand @if or @for blocks.
    {
      files: "frontend/ui/src/app/**/*.html",
      options: { parser: "angular" },
    },
  ],
};
