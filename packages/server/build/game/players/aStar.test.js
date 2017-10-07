'use strict';

var _aStar = require('./aStar');

var _aStar2 = _interopRequireDefault(_aStar);

var _maps = require('../maps');

var _maps2 = _interopRequireDefault(_maps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var map = _maps2.default.create();
var from = { line: 8, column: 36 };
var to = { line: 8, column: 8 };

console.log((0, _aStar2.default)(from, to, map));