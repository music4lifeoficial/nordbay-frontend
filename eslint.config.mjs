import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-config-prettier";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "out/**",
      ".next/**",
      "build/**",
      "coverage/**",
      "**/*.d.ts",
    ],
  },
  // Base JS rules
  js.configs.recommended,
  // Next.js (via compat)
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // TypeScript rules
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        // Avoid requiring a full TypeScript Program for linting to prevent tsconfig include issues
        sourceType: "module",
        ecmaVersion: 2022,
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      // TS hygiene
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/explicit-module-boundary-types": "warn",
      "@typescript-eslint/no-explicit-any": "warn", // was error across the repo
      "@typescript-eslint/no-empty-object-type": "warn", // reduce noise from empty interface warnings
      // General JS improvements
      "prefer-const": "error",
      "no-var": "error",
    },
  },
  // Turn off formatting-related rules
  prettier,
];

export default eslintConfig;
