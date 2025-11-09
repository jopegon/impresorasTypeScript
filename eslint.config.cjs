module.exports = [
  { ignores: ["node_modules/**", "dist/**", "build/**"] },

  require("@eslint/js").configs.recommended,

  // TypeScript
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: require("@typescript-eslint/parser"),
      parserOptions: { project: "./tsconfig.json", sourceType: "module", ecmaVersion: "latest" },
      globals: { console: "readonly", process: "readonly", Buffer: "readonly", __dirname: "readonly", __filename: "readonly" },
    },
    plugins: { "@typescript-eslint": require("@typescript-eslint/eslint-plugin") },
    rules: {
      "no-console": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/typedef": [
        "error",
        { parameter: true, propertyDeclaration: true, memberVariableDeclaration: true, variableDeclaration: false, arrowParameter: false },
      ],
    },
  },

  // JS puro
  {
    files: ["**/*.js"],
    languageOptions: {
      parserOptions: { ecmaVersion: "latest", sourceType: "module" },
      globals: { console: "readonly", process: "readonly", Buffer: "readonly", __dirname: "readonly", __filename: "readonly" },
    },
    rules: {
      "no-console": "off",
      "no-unused-vars": "off", // desactiva el warning de 'error' no usado
    },
  },
];
