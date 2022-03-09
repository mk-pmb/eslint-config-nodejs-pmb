// -*- coding: utf-8, tab-width: 2 -*-

import 'p-fatal';
import 'usnam-pmb';

import absdir from 'absdir';
import jsonify from 'safe-sortedjson';

import rules from '../rules.js';

const nmPath = absdir(import.meta, '../..')('.') + '/';

let json = jsonify(rules);
json = json.split(nmPath).join('nm://');

console.log(json);
