'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/users', function (req, res) {
  res.json(_db2.default.getUsers());
});

router.get('/users/:username', function (req, res) {
  var username = req.params.username;

  res.json(_db2.default.getUser({ username: username }));
});

exports.default = router;