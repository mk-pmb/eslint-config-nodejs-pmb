/* -*- tab-width: 2 -*- */
'use strict';

const instaffo = require('@instaffogmbh/eslint-config-nodejs/rules');

const rules = {
  ...instaffo.rules,

  // rules docs: https://github.com/eslint/eslint.github.io/tree/master/docs/rules

  'consistent-return': 'off',
  'func-names': ['error', 'as-needed'],
  'function-paren-newline': 'off',
  'lines-around-directive': 'off',
  'no-console': 'off',
  'no-extra-semi': 'off',
  'no-multiple-empty-lines': 'off',
  'no-multi-spaces': ['off', { ignoreEOLComments: true }],
  'object-curly-newline': 'off',
  'prefer-arrow-callback': 'off',
  'prefer-template': 'off',
  'semi': ['error', 'always'],
  'unicode-bom': 'off',
  'no-control-regex': 'off',
  'no-useless-escape': 'off',   // allow \. in RegExp char group
  'no-div-regex': 'error',
  'quote-props': 'off',
  'default-case': 'off',
  'key-spacing': 'off', // b/c it doesn't support all the combinations I want
  'arrow-parens': ['error', 'as-needed', { requireForBlockBody: true }],

  // Ugly but unfortunately node v12+ native ESM forces us to:
  'import/extensions': ['error', 'ignorePackages'],

  // rules docs: https://github.com/eslint/eslint.github.io/tree/master/docs/rules
};

const config = {
  ...instaffo,
  rules,
};

module.exports = config;
