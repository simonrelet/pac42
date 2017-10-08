'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (eatenPellets) {
  var superPellet = eatenPellets.super > 0;
  return function (player) {
    return superPellet && player.state === 'alive' && player.type === 'ghost' ? _extends({}, player, {
      effect: 'scared',
      stopEffectAt: Date.now() + 5000
    }) : player;
  };
};