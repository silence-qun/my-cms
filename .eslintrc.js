module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 12,
    // 可使用 ES Module
    sourceType: 'module',
  },
  rules: {
    // 大部分规则都有三个可选值：off（0）、warn（1）、error（2）
    'no-unused-vars': 'warn',
    quotes: ['error', 'double'],
    'no-console': 0,
  },
}
