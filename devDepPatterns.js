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


function gen() {
  return [
    'build/**' + jsGlob,
    '**{/,-,.}test{,s,/**}' + jsGlob,
    '**.spec' + jsGlob,
    '**/{,.}eslintrc.js{,on}',
    '**/webpack.config.js',
  ];
}


module.exports = { generate: gen };
