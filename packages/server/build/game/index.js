'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _loggers = require('./loggers');

var _loggers2 = _interopRequireDefault(_loggers);

var _systems = require('./systems');

var _systems2 = _interopRequireDefault(_systems);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logger = (0, _loggers2.default)('game');

var update = function update(io, environment) {
  return function () {
    logger.info('Sending environment');
    io.emit('update', JSON.stringify(environment.get()));
  };
};

var getMapStringifiedField = function getMapStringifiedField(_ref) {
  var tiles = _ref.tiles;
  return { tiles: tiles };
};

exports.default = function (server) {
  var io = (0, _socket2.default)(server);

  logger.info('Starting...');

  var system = _systems2.default.create();
  var stringifiedMap = JSON.stringify(getMapStringifiedField(system.map));

  io.on('connection', function (socket) {
    logger.info('Client connected.');
    socket.on('disconnect', function (reason) {
      return logger.info('Client disconnected:', reason);
    });
    socket.on('error', function (error) {
      return logger.error('Client error:', error);
    });
    socket.emit('map', stringifiedMap);
  });

  setInterval(update(io, system.environment), 40);
  logger.success('Started.');
};