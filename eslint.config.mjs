// eslint.config.js
import js from "@eslint/js";
import react from "eslint-plugin-react";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";

export default [
  // ✅ Base ESLint recommended rules for plain JS
  js.configs.recommended,

  // ✅ Base rules for TypeScript
  ...tseslint.configs.recommended,
  prettier,
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
      "packages/icare-components/src/**/*.{js,jsx,ts,tsx}",
      "packages/ICare/app/**/*.{js,jsx,ts,tsx}",
    ],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "@typescript-eslint": tsPlugin
    },
    rules: {
      "indent": ["warn", 2, { "SwitchCase": 1, "ignoredNodes": ["JSXElement", "JSXFragment"] }],

      // ✅ Let React plugin handle JSX indentation
      // "react/jsx-indent": ["warn", 2],       // 2 spaces for <Tag>
      "react/jsx-indent-props": ["warn", 2], // 2 spaces for props
      "semi": ["warn", "always"],             // Always require semicolons
      "quotes": ["warn", "double"],           // Enforce double quotes
      "no-trailing-spaces": "warn",           // No extra spaces at end of lines
      "eol-last": ["warn", "always"],         // File should end with newline
      "object-curly-spacing": ["warn", "always"], // { spaced: true }
      "array-bracket-spacing": ["warn", "never"], // [1, 2, 3]
      "comma-dangle": ["error", "never"], // Cleaner diffs
      "eqeqeq": ["warn", "always"],             // Use === not ==
      "no-unused-vars": "warn",                 // Catch unused variables
      "no-console": "warn",                     // Warn on console.log
      "no-debugger": "warn",                    // Disallow debugger statements
      "curly": ["warn", "all"],                 // Require braces for if/while/for
      "no-duplicate-imports": "warn",           // Import from a module once
      "react/prop-types": "off",                // If using TS, disable prop-types
      "react/self-closing-comp": "warn",        // <div /> instead of <div></div>
      "react/jsx-boolean-value": ["warn", "never"], // <Component disabled /> not disabled={true}
      "react/jsx-curly-spacing": ["warn", { "when": "never", "children": true }],
      "react/jsx-tag-spacing": ["warn", { "beforeSelfClosing": "always" }],
      "react/no-unescaped-entities": "warn",    // Catch unescaped HTML entities
      "react-hooks/rules-of-hooks": "error",    // Hook rules
      "react-hooks/exhaustive-deps": "warn"     // Hook deps checking
    },
    settings: {
      react: {
        version: "detect"
      }
    }
  },

];
