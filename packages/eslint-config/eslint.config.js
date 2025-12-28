const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

const js = require("@eslint/js");
const tseslint = require("@typescript-eslint/eslint-plugin");
const tsparser = require("@typescript-eslint/parser");
const prettier = require("eslint-config-prettier");
const turbo = require("eslint-config-turbo");
const onlyWarn = require("eslint-plugin-only-warn");

/** @type {import("eslint").Linter.Config[]} */
module.exports = [
  js.configs.recommended,
  {
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: true,
      },
      globals: {
        React: "readonly",
        JSX: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      "only-warn": onlyWarn,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "off",
    },
    settings: {
      "import/resolver": {
        typescript: {
          project,
        },
      },
    },
  },
  prettier,
  {
    ignores: [
      "**/.*.js",
      "**/node_modules/",
      "**/dist/",
    ],
  },
];