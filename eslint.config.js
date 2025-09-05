// eslint.config.js
import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  // ✅ Base ESLint recommended rules for plain JS
  js.configs.recommended,

  // ✅ Base rules for TypeScript
  ...tseslint.configs.recommended,

  {
    ignores: [
      "node_modules",
      "dist",
      "build",
      "www",
      "packages/*/dist",
      "packages/*/build",
      "packages/*/www",
      "packages/*/.react-router/types/**", 
    ],
  },
  {
    files: [
      "packages/*/src/**/*.js",
      "packages/*/src/**/*.jsx",
      "packages/*/src/**/*.ts",
      "packages/*/src/**/*.tsx",
    ],
    languageOptions: {
      parser: tseslint.parser, // 👈 TS parser is required
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json", // optional: for stricter type-aware linting
      },
      globals: {
        window: "readonly",
        document: "readonly",
        console: "readonly",
        CustomEvent: "readonly",
        CSSStyleSheet: "readonly",
        performance: "readonly",
        requestAnimationFrame: "readonly",
      },
    },
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "double"],
      "no-unused-vars": "warn",
      "no-undef": "off", // TS already catches undefined vars
    },
  },
  {
    files: ["packages/*/__tests__/**/*.js"],
    languageOptions: {
      globals: {
        require: "readonly",
        console: "readonly",
      },
    },
    
    rules: {
      "@typescript-eslint/no-require-imports": "off", // allow require in tests
    },
  },
  {
    files: ["**/*.spec.ts", "**/*.test.ts"],
    languageOptions: {
      parserOptions: {
        project: null, // ⬅️ turn off type-aware linting for test files
      },
      globals: {
        require: "readonly",
        console: "readonly",
      },
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off", // allow require() in tests
    },
  },
];
