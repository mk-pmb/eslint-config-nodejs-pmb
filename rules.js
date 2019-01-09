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

  'quote-props': ['error', 'as-needed', {
    keywords: true,
    numbers: true,
  }],

  // rules docs: https://github.com/eslint/eslint.github.io/tree/master/docs/rules
};

const config = {
  ...instaffo,
  rules,
};

module.exports = config;
