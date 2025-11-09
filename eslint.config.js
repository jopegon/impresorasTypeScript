// eslint.config.js
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  // Ignorar carpetas
  {
    ignores: ["node_modules/**", "dist/**", "build/**"],
  },

  // Configuración base de ESLint (recomendada)
  eslint.configs.recommended,

  // Configuración recomendada de TypeScript (flat)
  ...tseslint.configs.recommended,

  // Tus reglas y ajustes personalizados
  {
    files: ["**/*.ts"],
    languageOptions: {
      // Usar el parser de typescript-eslint
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        sourceType: "module",
        ecmaVersion: "latest",
      },
    },
    // Registrar el plugin para asegurarnos de que las reglas @typescript-eslint funcionen
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      // Reglas comunes
      "no-console": "off",
      "no-unused-vars": "off",

      // Reglas TypeScript
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/typedef": [
        "error",
        {
          parameter: true,
          propertyDeclaration: true,
          memberVariableDeclaration: true,
          variableDeclaration: false, // permite inferencia local
          arrowParameter: false,
        },
      ],
    },
  },
];
