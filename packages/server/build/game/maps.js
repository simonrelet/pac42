'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var SIMPLE_MAP_CENTER = { line: 11, column: 28 };
var SIMPLE_MAP_TILES = '#########################################################\n#########################################################\n##.....................................................##\n##.###########.##.##.##.#########.##.##.##.###########.##\n##.###########.##.##.##.#########.##.##.##.###########.##\n##.##..........##.##....##.....##....##.##..........##.##\n##.##.##.#####.##.#####.##.###.##.#####.##.#####.##.##.##\n##.##.##.#####.##.#####.##.###.##.#####.##.#####.##.##.##\n##....##.......##.##.................##.##.......##....##\n##.########.#####.##.##.####.####.##.##.#####.########.##\n##.########.#####.##.##.####.####.##.##.#####.########.##\n##...................##.##.....##.##...................##\n##.#####.########.##.##.#########.##.##.########.#####.##\n##.#####.########.##.##.#########.##.##.########.#####.##\n##.##....##.......##.................##.......##....##.##\n##.##.##.##.##.##.#####.#########.#####.##.##.##.##.##.##\n...##.##.##.##.##.#####.#########.#####.##.##.##.##.##...\n##.##.......##.##....##....###....##....##.##.......##.##\n##.##.########.#####.##.##.###.##.##.#####.########.##.##\n##.##.########.#####.##.##.###.##.##.#####.########.##.##\n##.............##.......##.....##.......##.............##\n##.########.#####.##.###############.##.#####.########.##\n##.########.#####.##.###############.##.#####.########.##\n##................##.................##................##\n#########################################################\n#########################################################';

var parse = function parse(tilesStr) {
  return tilesStr.trim().split(/\n/).map(function (line) {
    return line.split('').map(function (char) {
      return { wall: char === '#' };
    });
  });
};

var random = function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomPosition = function getRandomPosition(tiles) {
  var nbLines = tiles.length;
  var nbColumns = tiles[0].length;

  return function () {
    var pos = {
      line: random(2, nbLines - 2),
      column: random(2, nbColumns - 2)
    };

    if (tiles[pos.line][pos.column].wall) {
      pos.column = pos.column + 1 + tiles[pos.line].slice(pos.column + 1).findIndex(function (tile) {
        return !tile.wall;
      });
    }

    return pos;
  };
};

var isValidPosition = function isValidPosition(tiles) {
  var nbLines = tiles.length;
  var nbColumns = tiles[0].length;
  return function (_ref) {
    var line = _ref.line,
        column = _ref.column;
    return line >= 0 && line < nbLines && column >= 0 && column < nbColumns && !tiles[line][column].wall;
  };
};

var create = function create() {
  var tiles = parse(SIMPLE_MAP_TILES);
  return {
    center: SIMPLE_MAP_CENTER,
    tiles: tiles,
    getRandomPosition: getRandomPosition(tiles),
    isValidPosition: isValidPosition(tiles)
  };
};

exports.default = { create: create };