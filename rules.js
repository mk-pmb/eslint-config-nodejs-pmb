/* -*- tab-width: 2 -*- */
'use strict';

const configDeps = [
  ...require('./depsHelper.js'),
  ...require('./test/expectedPeerDependencies.js'),
];
const devDepPatternsGen = require('./devDepPatterns.js');

function uniq(a) { return Array.from(new Set(a)).sort(); }

const jsFextsNoDot = ['js', 'mjs'];
const devDepPatternsList = devDepPatternsGen.generate({ jsFextsNoDot });
const extraneousDepsOpts = {
  devDependencies: devDepPatternsList,
};

const importFextsNoDot = uniq([...jsFextsNoDot, 'json']);
const importFextsWithDots = importFextsNoDot.map(x => '.' + x);
const importSettings = {
  'import/extensions': importFextsWithDots,
  'import/resolver': {
    node: { extensions: importFextsWithDots },
  },
};


function mustStartWith(p) { return function d(s) { return s.startsWith(p); }; }

const lineLengthRules = {
  code: 80,
  ignoreRegExpLiterals: true,
  ignoreTrailingComments: true,
  ignoreUrls: true,
};

const rules = {

  // rules docs: https://github.com/eslint/eslint.github.io/tree/master/docs/rules

  'arrow-parens': ['error', 'as-needed', { requireForBlockBody: true }],
  'consistent-return': 'off',
  'default-case': 'off',
  'func-names': ['error', 'as-needed'],
  'function-call-argument-newline': 'off',
  'function-paren-newline': 'off',
  'global-require': 'off', // deprecated, see 'n/global-require' instead.
  'import/no-extraneous-dependencies': ['error', extraneousDepsOpts],
  'key-spacing': 'off', // b/c it doesn't support all the combinations I want
  'lines-around-directive': 'off',
  'max-len': ['error', lineLengthRules],
  'n/global-require': 'off', // I'd rather exempt just top-level arrays
  'no-console': 'off',
  'no-control-regex': 'off',
  'no-div-regex': 'error',
  'no-extra-semi': 'off',
  'no-multiple-empty-lines': 'off',
  'no-multi-spaces': ['off', { ignoreEOLComments: true }],
  'no-useless-escape': 'off',   // allow \. in RegExp char group
  'object-curly-newline': 'off',
  'padded-blocks': 'off',
  'prefer-arrow-callback': 'off',
  'prefer-template': 'off',
  'quote-props': 'off',
  'regexp/no-invalid-regexp': 'error',
  'semi': ['error', 'always'],
  'strict': ['error', 'safe'],
  'unicode-bom': 'off',

  // Ugly but unfortunately node v12+ native ESM forces us to:
  'import/extensions': ['error', 'ignorePackages'],

  // rules docs: https://github.com/eslint/eslint.github.io/tree/master/docs/rules
};


const overrides = [
  { files: ['**.js'], parserOptions: { sourceType: 'script' } },
  { files: ['**.mjs'],
    rules: {
      'n/no-unsupported-features/es-syntax': 'off', // assume esmod-pmb
    },
  },
  { files: devDepPatternsList,
    rules: {
      'n/no-unpublished-import': 'off',
      'n/no-unpublished-require': 'off',
    },
  },
];


const config = {

  env: {
    es6: true,
    node: true,
  },

  extends: [
    ...[
      ...configDeps.filter(mustStartWith('eslint-config-')),
    ].map(require.resolve),
    'plugin:n/recommended',
  ],

  overrides,

  parser: require.resolve('@babel/eslint-parser'),
  parserOptions: {
    allowImportExportEverywhere: true,
    requireConfigFile: false,
  },

  plugins: [
    'regexp',
    ...configDeps.filter(mustStartWith('eslint-plugin-')),
  ],

  rules,

  settings: {
    ...importSettings,
  },

};

module.exports = config;
