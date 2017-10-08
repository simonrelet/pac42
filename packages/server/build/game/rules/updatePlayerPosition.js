'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _constants = require('../constants');

var POSITION_INCREMENT = 4;

var getPlayerIncrement = function getPlayerIncrement(_ref) {
  var type = _ref.type,
      effect = _ref.effect;
  return POSITION_INCREMENT - (type === 'ghost' && effect === 'scared' ? POSITION_INCREMENT / 2 : 0);
};

var getDirectionIncrement = function getDirectionIncrement(direction, player, increment) {
  switch (direction) {
    case 'top':
      return { x: 0, y: -increment };
    case 'right':
      return { x: increment, y: 0 };
    case 'bottom':
      return { x: 0, y: increment };
    case 'left':
      return { x: -increment, y: 0 };
    default:
      return { x: 0, y: 0 };
  }
};

var addPosition = function addPosition(a, b) {
  return { x: a.x + b.x, y: a.y + b.y };
};

var isValidPosition = function isValidPosition(map, pos) {
  var topLine = Math.floor(pos.y / _constants.TILE_SIZE);
  var bottomLine = Math.floor((pos.y + _constants.TILE_SIZE - 1) / _constants.TILE_SIZE);
  var leftColumn = Math.floor(pos.x / _constants.TILE_SIZE);
  var rightColumn = Math.floor((pos.x + _constants.TILE_SIZE - 1) / _constants.TILE_SIZE);
  return map.isValidPosition({ line: topLine, column: leftColumn }) && map.isValidPosition({ line: topLine, column: rightColumn }) && map.isValidPosition({ line: bottomLine, column: leftColumn }) && map.isValidPosition({ line: bottomLine, column: rightColumn });
};

exports.default = function (map) {
  return function (player) {
    if (player.state !== 'alive') {
      return player;
    }

    var direction = player.direction,
        nextDirection = player.nextDirection,
        pos = player.pos;

    var increment = getPlayerIncrement(player);

    if (nextDirection && nextDirection !== direction) {
      // the player migh not be perfeclty aligned but the new direction is
      // reachable
      for (var i = 0; i < increment; i++) {
        var tmpPos = addPosition(addPosition(pos, getDirectionIncrement(direction, player, i)), getDirectionIncrement(nextDirection, player, increment - i));
        if (isValidPosition(map, tmpPos)) {
          return _extends({}, player, {
            pos: tmpPos,
            direction: nextDirection,
            nextDirection: null
          });
        }
      }
    }

    for (var _i = increment; _i > 0; _i--) {
      var _tmpPos = addPosition(pos, getDirectionIncrement(direction, player, _i));
      if (isValidPosition(map, _tmpPos)) {
        return _extends({}, player, { pos: _tmpPos });
      }
    }

    return _extends({}, player, { direction: null });
  };
};