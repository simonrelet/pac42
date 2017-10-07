'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var staticPath = function staticPath() {
  var file = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return _path2.default.join(__dirname, '..', '..', 'frontend', 'build', file);
};

router.use(_express2.default.static(staticPath()));
router.get('*', function (req, res) {
  res.sendFile(staticPath('index.html'));
});

exports.default = router;