/** @type {import('next').NextConfig} */
module.exports = {
  extends: ["next/core-web-vitals"],
  rules: {
    "@typescript-eslint/no-unused-vars": "warn",
    "prefer-const": "error",
    "no-var": "error"
  }
};
