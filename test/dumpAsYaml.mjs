// -*- coding: utf-8, tab-width: 2 -*-

import 'p-fatal';

import parseCliArgs from 'cli-args-parse-dashdash-2402-pmb';
import pEachSeries from 'p-each-series';
import preferDefaultExport from 'require-mjs-autoprefer-default-export-pmb';
import yamlify from 'yamlify-safe-pmb';

const EX = {

  async cliMain() {
    const [cliOpt, ...cliArgs] = parseCliArgs(process.argv.slice(2));
    const state = { cliOpt };
    if (!cliArgs.length) { cliArgs[0] = ''; }
    const moduleSpecifiers = cliArgs.map(EX.parseCliArgAsModuleSpecifiers);
    await pEachSeries(moduleSpecifiers, EX.dumpOneEslintConfig);
  },


  parseCliArgAsModuleSpecifiers(arg) {
    if (!arg) { return '../rules.js'; }
    if (EX.checkModuleNameSpecifier(arg)) { return arg; }
    return 'eslint-config-' + arg;
  },


  checkModuleNameSpecifier(s) {
    if (!s) { return ''; }
    if (s.startsWith('.')) { return s; }
    if (s.startsWith('/')) { return s; }
    if (s.includes('/')) {
      if (!s.startsWith('@')) { return s; }
      const nSlashes = arg.split('/').length - 1;
      if (nSlashes === 1) { return s; }
    }
    return '';
  },


  async dumpOneEslintConfig(modSpec) {
    const rules = preferDefaultExport(await import(modSpec));
    console.log(yamlify(rules));
  },



};






EX.cliMain();
