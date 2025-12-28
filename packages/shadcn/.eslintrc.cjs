/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@bwalk/eslint-config/react-internal.js", "plugin:storybook/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.lint.json",
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: [
    "node_modules",
    "dist",
    "tailwind.config.ts",
    "src/components/ui/*.tsx",
  ],
};
