module.exports = {
  env: {
    jest: true,
    browser: true,
    es6: true,
  },
  extends: ["standard", "prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    "prettier/prettier": ["error"],
  },
  plugins: ["prettier", "jest"],
};
