'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _constants = require('../constants');

var _positions = require('../positions');

var toPlayerPos = function toPlayerPos(_ref) {
  var x = _ref.x,
      y = _ref.y;
  return {
    x: x - (_constants.PLAYER_SIZE - _constants.TILE_SIZE) / 2,
    y: y - (_constants.PLAYER_SIZE - _constants.TILE_SIZE) / 2
  };
};

var intersects = function intersects(a, b) {
  var aPlayer = toPlayerPos(a);
  var bPlayer = toPlayerPos(b);
  return !(aPlayer.x + _constants.PLAYER_SIZE < bPlayer.x || bPlayer.x + _constants.PLAYER_SIZE < aPlayer.x || aPlayer.y + _constants.PLAYER_SIZE < bPlayer.y || bPlayer.y + _constants.PLAYER_SIZE < aPlayer.y);
};

var getCollisionList = function getCollisionList(_ref2, players) {
  var id = _ref2.id,
      pos = _ref2.pos,
      type = _ref2.type;
  return players.filter(function (otherPlayer) {
    return otherPlayer.state === 'alive' && otherPlayer.type !== type && intersects(pos, otherPlayer.pos);
  });
};

var stopEffect = function stopEffect(player) {
  return _extends({}, player, {
    effect: null,
    stopEffectAt: null
  });
};

var killPlayer = function killPlayer(player) {
  return stopEffect(_extends({}, player, {
    state: 'dead',
    direction: null,
    resurectAt: Date.now() + 5000
  }));
};

var resurectPlayer = function resurectPlayer(map, player) {
  return _extends({}, player, {
    state: 'alive',
    resurectAt: null,
    pos: (0, _positions.toAbsolutePosition)(map.getRandomTypedPosition(player))
  });
};

var updateAlivePlayer = function updateAlivePlayer(player, players) {
  var collisionWith = getCollisionList(player, players);
  if (collisionWith.length) {
    if (player.type === 'pacman') {
      if (collisionWith.some(function (_ref3) {
        var effect = _ref3.effect;
        return effect !== 'scared';
      })) {
        return killPlayer(player);
      }
    } else if (player.effect === 'scared') {
      return killPlayer(player);
    }
  }

  if (player.stopEffectAt <= Date.now()) {
    return stopEffect(player);
  }

  return player;
};

var updateDeadPlayer = function updateDeadPlayer(map, player) {
  if (player.resurectAt <= Date.now()) {
    return resurectPlayer(map, player);
  }
  return player;
};

exports.default = function (map) {
  return function (player, _, players) {
    switch (player.state) {
      case 'alive':
        return updateAlivePlayer(player, players);
      case 'dead':
        return updateDeadPlayer(map, player);
      default:
        return player;
    }
  };
};