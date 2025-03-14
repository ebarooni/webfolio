/** @type {import('stylelint').Config} */
export default {
  extends: ["@ebarooni/stylelint-config"],
  ignoreFiles: ["dist/**"],
  rules: {
    "scss/at-rule-no-unknown": false,
  },
};
