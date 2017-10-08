'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stateWillChange = exports.applyEvent = exports.changePlayerDirection = exports.removePlayer = exports.addPlayer = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _updatePlayerPosition = require('./updatePlayerPosition');

var _updatePlayerPosition2 = _interopRequireDefault(_updatePlayerPosition);

var _updatePlayerState = require('./updatePlayerState');

var _updatePlayerState2 = _interopRequireDefault(_updatePlayerState);

var _updatePellets = require('./updatePellets');

var _updatePellets2 = _interopRequireDefault(_updatePellets);

var _applyPelletEffect = require('./applyPelletEffect');

var _applyPelletEffect2 = _interopRequireDefault(_applyPelletEffect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var typeID = 0;
var ADD_PLAYER = typeID++;
var REMOVE_PLAYER = typeID++;
var CHANGE_PLAYER_DIRECTION = typeID++;
var INITIAL_STATE = { players: [], pellets: [] };

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
        return player.id === payload.id && player.state === 'alive' ? _extends({}, player, { nextDirection: payload.direction }) : player;
      });
    default:
      return players;
  }
};

var applyEvent = exports.applyEvent = function applyEvent() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE,
      players = _ref2.players,
      pellets = _ref2.pellets;

  var event = arguments[1];
  return {
    pellets: pellets,
    players: applyPlayerEvent(players, event)
  };
};

var stateWillChange = exports.stateWillChange = function stateWillChange(map) {
  return function (_ref3) {
    var players = _ref3.players,
        pellets = _ref3.pellets;

    var newPlayers = players.map((0, _updatePlayerPosition2.default)(map)).map((0, _updatePlayerState2.default)(map));

    var newPellets = (0, _updatePellets2.default)(pellets, newPlayers);
    if (newPellets.eaten) {
      newPlayers = newPlayers.map((0, _applyPelletEffect2.default)(newPellets.eaten));
    }

    return {
      pellets: newPellets.pellets,
      players: newPlayers
    };
  };
};