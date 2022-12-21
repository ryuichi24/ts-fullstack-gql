// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    // eslint-disable-next-line no-undef
    tsconfigRootDir: __dirname,
    project: ["tsconfig.eslint.json"]
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {},
};
