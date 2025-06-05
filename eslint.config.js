import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { includeIgnoreFile } from "@eslint/compat";
import ts from "typescript-eslint";
import svelte from "eslint-plugin-svelte";
import prettier from "eslint-config-prettier";
import svelteConfig from "./svelte.config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, ".gitignore");
const hideErrorsBy = "off";
export default ts.config(
  includeIgnoreFile(gitignorePath),
  js.configs.recommended,
  ...ts.configs.recommended,
  ...svelte.configs.recommended,
  prettier,
  ...svelte.configs.prettier,
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      "no-undef": hideErrorsBy,
      "svelte/no-unused-props": hideErrorsBy,
      "svelte/no-at-html-tags": hideErrorsBy,
      "svelte/require-each-key": hideErrorsBy,
      "svelte/no-reactive-reassign": hideErrorsBy,
      "@typescript-eslint/no-explicit-any": hideErrorsBy,
      "a11y_click_events_have_key_events": hideErrorsBy,
      "a11y_no_static_element_interactions": hideErrorsBy,
      "a11y_no_noninteractive_element_interactions": hideErrorsBy,
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  {
    files: ["**/*.svelte", "**/*.svelte.ts", "**/*.svelte.js"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        extraFileExtensions: [".svelte"],
        parser: ts.parser,
        svelteConfig,
      },
    },
  },
);
