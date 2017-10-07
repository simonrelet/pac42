'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _positions = require('../positions');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var getHashFunction = function getHashFunction(map) {
  return function (pos) {
    return pos.line * map.tiles[0].length + pos.column;
  };
};

var manhattanDistance = function manhattanDistance(a, b) {
  return Math.abs(a.line - b.line) + Math.abs(a.column - b.column);
};

var isEmpty = function isEmpty(map) {
  return Object.keys(map).length === 0;
};
var entries = function entries(map) {
  return Object.entries(map).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    return { key: key, value: value };
  });
};

var getMinFScore = function getMinFScore(openSet, fScore) {
  var res = entries(openSet).reduce(function (min, entry) {
    return fScore[entry.key] < min.fScore ? { fScore: fScore[entry.key], pos: entry.value } : min;
  }, { fScore: Infinity, pos: null });

  return res.pos;
};

var getReconstructPathFunction = function getReconstructPathFunction(hash) {
  return function (cameFrom, end) {
    var path = [end];
    var currentPos = end;
    while (cameFrom[hash(currentPos)]) {
      currentPos = cameFrom[hash(currentPos)];
      path = [currentPos].concat(_toConsumableArray(path));
    }
    return path;
  };
};

var getNeighboursFunction = function getNeighboursFunction(map) {
  return function (pos) {
    return _positions.directions.map(function (direction) {
      return (0, _positions.addPosition)(pos, (0, _positions.getDirectionIncrement)(direction));
    }).filter(map.isValidPosition);
  };
};

exports.default = function (start, end, map) {
  if ((0, _positions.isEqual)(start, end)) {
    return [start, end];
  }

  // The function to hash a position
  var hash = getHashFunction(map);
  // The function to reconstruct the path
  var reconstructPath = getReconstructPathFunction(hash);
  // The function to get the neighbours of a position
  var neighbours = getNeighboursFunction(map);
  // The set of positions already evaluated
  var closedSet = {};
  // The set of currently discovered positions that are not evaluated yet.
  // Initially, only the start position is known.
  var openSet = _defineProperty({}, hash(start), start);
  // For each position, which position it can most efficiently be reached from.
  // If a position can be reached from many positions, cameFrom will eventually contain the
  // most efficient previous step.
  var cameFrom = {};
  // For each position, the cost of getting from the start position to that position.
  // The cost of going from start to start is zero.
  var gScore = _defineProperty({}, hash(start), 0);
  // For each position, the total cost of getting from the start position to the goal
  // by passing by that position. That value is partly known, partly heuristic.
  // For the first position, that value is completely heuristic.
  var fScore = _defineProperty({}, hash(start), manhattanDistance(start, end));

  var _loop = function _loop() {
    // Get the position in openSet having the lowest fScore value
    var currentPos = getMinFScore(openSet, fScore);

    if ((0, _positions.isEqual)(currentPos, end)) {
      return {
        v: reconstructPath(cameFrom, end)
      };
    }

    var currentPosHash = hash(currentPos);

    delete openSet[currentPosHash];
    closedSet[currentPosHash] = currentPos;

    neighbours(currentPos).forEach(function (neighbour) {
      var neighbourHash = hash(neighbour);
      // Ignore the neighbor which is already evaluated
      if (!closedSet[neighbourHash]) {
        // The distance from start to the neighbor
        var tentativeGScore = gScore[currentPosHash] + 1;

        if (!openSet[neighbourHash] || tentativeGScore < gScore[neighbourHash]) {
          // This path is the best until now, record it
          cameFrom[neighbourHash] = currentPos;
          gScore[neighbourHash] = tentativeGScore;
          fScore[neighbourHash] = tentativeGScore + manhattanDistance(neighbour, end);

          if (!openSet[neighbourHash]) {
            // Discover a new position
            openSet[neighbourHash] = neighbour;
          }
        }
      }
    });
  };

  while (!isEmpty(openSet)) {
    var _ret = _loop();

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  }

  return [];
};