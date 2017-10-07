'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var level = process.env.LOG_LEVEL || 'error';
var info = function info(scope) {
  return function () {
    var _console;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_console = console).log.apply(_console, ['info', scope].concat(args));
  };
};
var error = function error(scope) {
  return function () {
    var _console2;

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return (_console2 = console).error.apply(_console2, ['error', scope].concat(args));
  };
};
var success = function success(scope) {
  return function () {
    var _console3;

    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return (_console3 = console).log.apply(_console3, ['success', scope].concat(args));
  };
};

exports.default = function (scope) {
  return {
    info: level === 'info' ? info(scope) : function () {},
    error: error(scope),
    success: level === 'info' ? success(scope) : function () {}
  };
};