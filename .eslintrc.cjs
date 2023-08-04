/* eslint-env node */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:svelte/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    extraFileExtensions: [".svelte"],
  },
  overrides: [
    {
      files: ["*.svelte"],
      parser: "svelte-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
      },
    },
  ],
  plugins: ["@typescript-eslint"],
  root: true,
};
