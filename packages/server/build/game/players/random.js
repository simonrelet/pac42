'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _aStar = require('./aStar');

var _aStar2 = _interopRequireDefault(_aStar);

var _positions = require('../positions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getRandomPosition = function getRandomPosition(currentPos, map) {
  var pos = void 0;
  do {
    pos = map.getRandomPosition();
  } while ((0, _positions.isEqual)(pos, currentPos));
  return pos;
};

var create = function create(logger, id, map) {
  var state = {
    destinationPos: null,
    path: null
  };

  var resetState = function resetState() {
    state.destinationPos = null;
    state.path = null;
  };

  return {
    play: function play(environment) {
      var my = environment.state.players.find(function (p) {
        return p.id === id;
      });
      if (my.state !== 'alive') {
        resetState();
        return;
      }

      var currentPos = (0, _positions.toTilePosition)(my.pos);

      logger.info('Current position:', currentPos);

      if ((0, _positions.isEqual)(currentPos, state.destinationPos)) {
        resetState();
      }

      if (!state.destinationPos) {
        // Find a new target position
        state.destinationPos = getRandomPosition(currentPos, map);
        // remove the first position of the path as it is the current one
        state.path = (0, _aStar2.default)(currentPos, state.destinationPos, map).slice(1);
        logger.info('Targeting position:', state.destinationPos);
      }

      if ((0, _positions.isEqual)(currentPos, state.path[0])) {
        // Position was reached
        // Target the next one in the path
        state.path = state.path.slice(1);
      }

      var direction = (0, _positions.getDirection)(currentPos, state.path[0]);
      if (direction !== my.direction) {
        logger.info('direction', direction);
        environment.changeDirection(direction);
      }
    }
  };
};

exports.default = function (player) {
  return _extends({}, player, { create: create });
};