module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    "react-app",
    "react-app/jest",
    "airbnb",
    "airbnb/hooks",
    "plugin:prettier/recommended",
  ],
  overrides: [
    {
      files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
      extends: ["plugin:testing-library/react"],
    },
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["prettier"],
  rules: {
    semi: "warn",
    "no-unused-vars": "warn",
    "no-restricted-exports": 0,
    "no-plusplus": [2, { allowForLoopAfterthoughts: true }],
    "react/jsx-props-no-spreading": "off",
    "react/self-closing-comp": "off",
    "react/jsx-filename-extension": ["warn", { extensions: [".js", ".jsx"] }],
  },
};
