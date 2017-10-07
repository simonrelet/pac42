'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

var _lodash = require('lodash.find');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getUsers = function getUsers() {
  return _db2.default.users;
};
var getUser = function getUser(user) {
  return (0, _lodash2.default)(_db2.default.users, user);
};

exports.default = {
  getUsers: getUsers,
  getUser: getUser
};