'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOpositeDirection = exports.getDirectionIncrement = exports.getDirection = exports.toTilePosition = exports.toAbsolutePosition = exports.isEqual = exports.addPosition = exports.directions = undefined;

var _constants = require('./constants');

var DIRECTIONS = [{ key: 'top', increment: { column: 0, line: -1 } }, { key: 'right', increment: { column: 1, line: 0 } }, { key: 'bottom', increment: { column: 0, line: 1 } }, { key: 'left', increment: { column: -1, line: 0 } }];
var NO_DIRECTION = 'none';
var NO_DIRECTION_INCREMENT = { column: 0, line: 0 };

var directions = exports.directions = DIRECTIONS.map(function (d) {
  return d.key;
});

var addPosition = exports.addPosition = function addPosition(a, b) {
  return {
    line: a.line + b.line,
    column: a.column + b.column
  };
};

var isEqual = exports.isEqual = function isEqual(a, b) {
  return !!a && !!b && a.line === b.line && a.column === b.column;
};

var toAbsolutePosition = exports.toAbsolutePosition = function toAbsolutePosition(_ref) {
  var line = _ref.line,
      column = _ref.column;
  return {
    x: column * _constants.TILE_SIZE,
    y: line * _constants.TILE_SIZE
  };
};

var toTilePosition = exports.toTilePosition = function toTilePosition(_ref2) {
  var x = _ref2.x,
      y = _ref2.y;
  return {
    line: Math.floor((y + _constants.TILE_SIZE / 2) / _constants.TILE_SIZE),
    column: Math.floor((x + _constants.TILE_SIZE / 2) / _constants.TILE_SIZE)
  };
};

var getDirection = exports.getDirection = function getDirection(from, to) {
  var increment = {
    line: to.line - from.line,
    column: to.column - from.column
  };

  var res = DIRECTIONS.find(function (d) {
    return isEqual(d.increment, increment);
  });
  return res ? res.key : NO_DIRECTION;
};

var getDirectionIncrement = exports.getDirectionIncrement = function getDirectionIncrement(direction) {
  var res = DIRECTIONS.find(function (d) {
    return d.key === direction;
  });
  return res ? res.increment : NO_DIRECTION_INCREMENT;
};

var getOpositeDirection = exports.getOpositeDirection = function getOpositeDirection(direction) {
  switch (direction) {
    case 'top':
      return 'bottom';
    case 'right':
      return 'left';
    case 'bottom':
      return 'top';
    case 'left':
      return 'right';
    default:
      return '';
  }
};