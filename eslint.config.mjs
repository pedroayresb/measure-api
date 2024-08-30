import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

// module.exports = [
//   // Any other config imports go at the top
//   eslintPluginPrettierRecommended,
// ];

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
  },
  {
    languageOptions: {
      globals: globals.es2021,
    },
  },
  {
    ignores: ["package.json", "package-lock.json", "node_modules", "dist"],
  },
  pluginJs.configs.recommended,
  eslintPluginPrettierRecommended,
  ...tseslint.configs.recommended,
];
