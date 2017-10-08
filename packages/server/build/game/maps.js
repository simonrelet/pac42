'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var SIMPLE_MAP_CENTER = { line: 11, column: 28 };
var SIMPLE_MAP_TILES = '#########################################################\n#########################################################\n##.....................................................##\n##.###########.##.##.##.#########.##.##.##.###########.##\n##.###########.##.##.##.#########.##.##.##.###########.##\n##.##..........##.##....##.....##....##.##..........##.##\n##.##.##.#####.##.#####.##.###.##.#####.##.#####.##.##.##\n##.##.##.#####.##.#####.##.###.##.#####.##.#####.##.##.##\n##....##.......##.##.................##.##.......##....##\n##.########.#####.##.##.####.####.##.##.#####.########.##\n##.########.#####.##.##.####.####.##.##.#####.########.##\n##...................##.##.....##.##...................##\n##.#####.########.##.##.#########.##.##.########.#####.##\n##.#####.########.##.##.#########.##.##.########.#####.##\n##.##....##.......##.................##.......##....##.##\n##.##.##.##.##.##.#####.#########.#####.##.##.##.##.##.##\n...##.##.##.##.##.#####.#########.#####.##.##.##.##.##...\n##.##.......##.##....##....###....##....##.##.......##.##\n##.##.########.#####.##.##.###.##.##.#####.########.##.##\n##.##.########.#####.##.##.###.##.##.#####.########.##.##\n##.............##.......##.....##.......##.............##\n##.########.#####.##.###############.##.#####.########.##\n##.########.#####.##.###############.##.#####.########.##\n##................##.................##................##\n#########################################################\n#########################################################';

var parse = function parse(tilesStr) {
  return tilesStr.trim().split(/\n/).map(function (line, l) {
    return line.split('').map(function (char, column) {
      return { wall: char === '#', line: l, column: column };
    });
  });
};

var random = function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomPosition = function getRandomPosition(tiles, accept) {
  var nbLines = tiles.length;
  var nbColumns = tiles[0].length;

  var pos = {
    line: random(2, nbLines - 2),
    column: random(2, nbColumns - 2)
  };

  if (!accept(tiles[pos.line][pos.column])) {
    pos.column = pos.column + 1 + tiles[pos.line].slice(pos.column + 1).findIndex(accept);
  }

  return pos;
};

var getRandomGhostPosition = function getRandomGhostPosition(center) {
  return {
    line: center.line,
    column: center.column - 2 + Math.floor(Math.random() * 5)
  };
};

var isCentralPosition = function isCentralPosition(center, pos) {
  return (
    // the center zone
    pos.line === center.line && pos.column >= center.column - 2 && pos.column <= center.column + 2 ||
    // the entry of the center zone
    pos.column === center.column && (pos.line === center.line - 1 || pos.line === center.line - 2)
  );
};

var getRandomPacmanPosition = function getRandomPacmanPosition(tiles, center) {
  return getRandomPosition(tiles, function (tile) {
    return !tile.wall && !isCentralPosition(center, tile);
  });
};

var getRandomTypedPosition = function getRandomTypedPosition(tiles, center) {
  return function (_ref) {
    var type = _ref.type;
    return type === 'ghost' ? getRandomGhostPosition(center) : getRandomPacmanPosition(tiles, center);
  };
};

var getAnyRandomPosition = function getAnyRandomPosition(tiles) {
  return function () {
    return getRandomPosition(tiles, function (tile) {
      return !tile.wall;
    });
  };
};

var isValidPosition = function isValidPosition(tiles) {
  var nbLines = tiles.length;
  var nbColumns = tiles[0].length;
  return function (_ref2) {
    var line = _ref2.line,
        column = _ref2.column;
    return line >= 0 && line < nbLines && column >= 0 && column < nbColumns && !tiles[line][column].wall;
  };
};

var create = function create() {
  var tiles = parse(SIMPLE_MAP_TILES);
  var center = SIMPLE_MAP_CENTER;
  return {
    tiles: tiles,
    center: center,
    getRandomTypedPosition: getRandomTypedPosition(tiles, center),
    getRandomPosition: getAnyRandomPosition(tiles),
    isValidPosition: isValidPosition(tiles)
  };
};

exports.default = { create: create };