import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Disable warnings that don't affect functionality
      "@typescript-eslint/no-unused-vars": "warn",
      "@next/next/no-img-element": "warn",
      "react-hooks/exhaustive-deps": "warn",
      // Keep critical errors as errors
      "@typescript-eslint/no-explicit-any": "error",
      "react/no-unescaped-entities": "error",
      "@typescript-eslint/no-empty-object-type": "error",
    }
  }
];

export default eslintConfig;
