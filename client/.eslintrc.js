module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  env: {
    browser: true,
    commonjs: true,
    node: true,
    es6: true
  },
  plugins: ['react', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'prettier',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      "spread": true,
      jsx: true
    },
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    indent: ['error', 2,  {"SwitchCase": 1}],
    'linebreak-style': 'off',
    quotes: ['warn', 'single'],
    semi: ['error', 'always'],
    'prettier/prettier': 'error',
    'global-require': 'off',
    'no-console': 'warn'
  }
};
