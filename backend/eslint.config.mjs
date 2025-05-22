import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig({
  files: ["**/*.{js,ts}"],
  languageOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    globals: globals.node,
    parser: tseslint.parser,
    parserOptions: {
      project: true,
    },
  },
  plugins: {
    "@typescript-eslint": tseslint.plugin,
  },
  rules: {
    ...js.configs.recommended.rules,
    ...tseslint.configs.recommended.rules,
    "no-console": "error",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
  },
});
