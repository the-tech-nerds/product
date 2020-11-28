module.exports = {
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  extends: [
    '@technerds/eslint-config'
  ],
  rules: {
    "nest/max-attributes-per-line": "off"
  }
};
