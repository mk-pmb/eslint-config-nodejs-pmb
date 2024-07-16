/* -*- tab-width: 2 -*- */
'use strict';

module.exports = (function depsHelper(require) {
  return [
    require('@babel/eslint-parser'),
    require('eslint-plugin-regexp'),
    require('eslint-config-airbnb-base'),
  ];
}(String));
