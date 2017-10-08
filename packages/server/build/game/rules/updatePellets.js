'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _positions = require('../positions');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getRandomPelletType = function getRandomPelletType() {
  return Math.floor(Math.random() * 100) === 0 ? 'super' : 'normal';
};

exports.default = function (pellets, players) {
  var eaten = null;
  var newPellets = players.reduce(function (newPellets, player) {
    if (player.state === 'alive') {
      var pos = (0, _positions.toTilePosition)(player.pos);

      if (player.type === 'pacman') {
        return newPellets.filter(function (pellet) {
          var eatPellet = (0, _positions.isEqual)(pellet.pos, pos);
          if (eatPellet && pellet.type !== 'normal') {
            eaten = eaten || {};
            eaten = _extends({}, eaten, _defineProperty({}, pellet.type, (eaten[pellet.type] || 0) + 1));
          }
          return !eatPellet;
        });
      }

      if (!newPellets.some(function (pellet) {
        return (0, _positions.isEqual)(pellet.pos, pos);
      })) {
        return [].concat(_toConsumableArray(newPellets), [{ pos: pos, type: getRandomPelletType() }]);
      }
    }
    return newPellets;
  }, pellets);

  return { eaten: eaten, pellets: newPellets };
};