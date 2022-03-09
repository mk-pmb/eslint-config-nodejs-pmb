/* -*- tab-width: 2 -*- */
'use strict';

const devDirs = [
  'build',
  'test',
  'tests',
];


function gen(how) {
  const { jsFextsNoDot } = how;
  const jsGlob = ('.{' + Array.from(jsFextsNoDot).join(',') + '}');
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
