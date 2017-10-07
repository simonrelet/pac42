'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stateWillChange = exports.applyEvent = exports.changePlayerDirection = exports.removePlayer = exports.addPlayer = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _constants = require('./constants');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var typeID = 0;
var ADD_PLAYER = typeID++;
var REMOVE_PLAYER = typeID++;
var CHANGE_PLAYER_DIRECTION = typeID++;
var POSITION_INCREMENT = 4;
var INITIAL_STATE = { players: [] };

var addPlayer = exports.addPlayer = function addPlayer(payload) {
  return { type: ADD_PLAYER, payload: payload };
};
var removePlayer = exports.removePlayer = function removePlayer(payload) {
  return { type: REMOVE_PLAYER, payload: payload };
};
var changePlayerDirection = exports.changePlayerDirection = function changePlayerDirection(payload) {
  return {
    type: CHANGE_PLAYER_DIRECTION,
    payload: payload
  };
};

var applyPlayerEvent = function applyPlayerEvent(players, _ref) {
  var type = _ref.type,
      payload = _ref.payload;

  switch (type) {
    case ADD_PLAYER:
      return [].concat(_toConsumableArray(players), [payload]);
    case REMOVE_PLAYER:
      return players.filter(function (player) {
        return player.id !== payload;
      });
    case CHANGE_PLAYER_DIRECTION:
      return players.map(function (player) {
        return player.id === payload.id ? _extends({}, player, { nextDirection: payload.direction }) : player;
      });
    default:
      return players;
  }
};

var applyEvent = exports.applyEvent = function applyEvent() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE,
      players = _ref2.players;

  var event = arguments[1];
  return {
    players: applyPlayerEvent(players, event)
  };
};

var getDirectionIncrement = function getDirectionIncrement(direction) {
  switch (direction) {
    case 'top':
      return { x: 0, y: -POSITION_INCREMENT };
    case 'right':
      return { x: POSITION_INCREMENT, y: 0 };
    case 'bottom':
      return { x: 0, y: POSITION_INCREMENT };
    case 'left':
      return { x: -POSITION_INCREMENT, y: 0 };
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

var updatePosition = function updatePosition(map) {
  return function (player) {
    var pos = void 0;
    if (player.nextDirection) {
      pos = addPosition(player.pos, getDirectionIncrement(player.nextDirection));
      if (isValidPosition(map, pos)) {
        return _extends({}, player, {
          pos: pos,
          direction: player.nextDirection,
          nextDirection: null
        });
      }
    }

    if (player.direction) {
      pos = addPosition(player.pos, getDirectionIncrement(player.direction));
      if (isValidPosition(map, pos)) {
        return _extends({}, player, { pos: pos });
      }
    }

    return _extends({}, player, { direction: null });
  };
};

var stateWillChange = exports.stateWillChange = function stateWillChange(map) {
  return function (newState) {
    var newPositions = newState.players.map(updatePosition(map));
    // TODO: handle collisions
    return { players: newPositions };
  };
};