/* -*- tab-width: 2 -*- */
'use strict';

const instaffo = require('@instaffogmbh/eslint-config-nodejs/rules.js');

const jsFexts = (function refine() {
  let xt = new Set(instaffo.settings['import/extensions']);
  xt.delete('.json');
  xt = Array.from(xt);
  return xt;
}());

const jsGlob = ('.{' + jsFexts.map(s => s.replace(/^\./, '')).join(',') + '}');

const devDirs = [
  'build',
  'test',
  'tests',
];


function gen() {
  const cwd = process.cwd();
  const nmSub = cwd.replace(/^\S+\/node_modules(?=\/)/, '…') + '/';
  if (devDirs.find(d => nmSub.includes('/' + d + '/'))) { return ['**']; }
  return [
    ...devDirs.map(d => d + '/**'),
    '**{/,-,.}test{,s,/**}' + jsGlob,
    '**.spec' + jsGlob,
    '**/{,.}eslintrc.js{,on}',
    '**/webpack.config.js',
  ];
}


module.exports = { generate: gen };
