import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import vitest from "eslint-plugin-vitest";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    plugins: {
      vitest
    },
    rules: {
      ...vitest.configs.recommended.rules,
      // "vitest/max-nested-describe": ["error", { "max": 3 }] // you can also modify rules' behavior using option like this
    },
  },
];