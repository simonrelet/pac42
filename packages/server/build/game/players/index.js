'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _loggers = require('../loggers');

var _loggers2 = _interopRequireDefault(_loggers);

var _rules = require('../rules');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createEnvWrapper = function createEnvWrapper(environment, id) {
  return {
    state: environment.get(),
    changeDirection: function changeDirection(direction) {
      environment.dispatch((0, _rules.changePlayerDirection)({ id: id, direction: direction }));
    }
  };
};

var create = function create(id, playerAI, environment, map) {
  var name = playerAI.name + '-' + id;
  var logger = (0, _loggers2.default)(name);
  var player = playerAI.create(logger, id, map);

  return {
    name: name,
    type: playerAI.type,
    id: id,
    start: function start() {
      setInterval(function () {
        return player.play(createEnvWrapper(environment, id));
      }, 40);
    }
  };
};

exports.default = { create: create };