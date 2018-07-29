import {
  directions,
  addPosition,
  getDirectionIncrement,
  isEqual,
} from '../positions';

const getHashFunction = map => pos =>
  pos.line * map.tiles[0].length + pos.column;

const manhattanDistance = (a, b) =>
  Math.abs(a.line - b.line) + Math.abs(a.column - b.column);

const isEmpty = map => Object.keys(map).length === 0;
const entries = map =>
  Object.entries(map).map(([key, value]) => ({ key, value }));

const getMinFScore = (openSet, fScore) => {
  const res = entries(openSet).reduce(
    (min, entry) =>
      fScore[entry.key] < min.fScore
        ? { fScore: fScore[entry.key], pos: entry.value }
        : min,
    { fScore: Infinity, pos: null },
  );

  return res.pos;
};

const getReconstructPathFunction = hash => (cameFrom, end) => {
  let path = [end];
  let currentPos = end;
  while (cameFrom[hash(currentPos)]) {
    currentPos = cameFrom[hash(currentPos)];
    path = [currentPos, ...path];
  }
  return path;
};

const getNeighboursFunction = map => pos => {
  return directions
    .map(direction => addPosition(pos, getDirectionIncrement(direction)))
    .filter(map.isValidPosition);
};

export default (start, end, map) => {
  if (isEqual(start, end)) {
    return [start, end];
  }

  // The function to hash a position
  const hash = getHashFunction(map);
  // The function to reconstruct the path
  const reconstructPath = getReconstructPathFunction(hash);
  // The function to get the neighbours of a position
  const neighbours = getNeighboursFunction(map);
  // The set of positions already evaluated
  const closedSet = {};
  // The set of currently discovered positions that are not evaluated yet.
  // Initially, only the start position is known.
  const openSet = { [hash(start)]: start };
  // For each position, which position it can most efficiently be reached from.
  // If a position can be reached from many positions, cameFrom will eventually contain the
  // most efficient previous step.
  const cameFrom = {};
  // For each position, the cost of getting from the start position to that position.
  // The cost of going from start to start is zero.
  const gScore = { [hash(start)]: 0 };
  // For each position, the total cost of getting from the start position to the goal
  // by passing by that position. That value is partly known, partly heuristic.
  // For the first position, that value is completely heuristic.
  const fScore = { [hash(start)]: manhattanDistance(start, end) };

  while (!isEmpty(openSet)) {
    // Get the position in openSet having the lowest fScore value
    const currentPos = getMinFScore(openSet, fScore);

    if (isEqual(currentPos, end)) {
      return reconstructPath(cameFrom, end);
    }

    const currentPosHash = hash(currentPos);

    delete openSet[currentPosHash];
    closedSet[currentPosHash] = currentPos;

    neighbours(currentPos).forEach(neighbour => {
      const neighbourHash = hash(neighbour);
      // Ignore the neighbor which is already evaluated
      if (!closedSet[neighbourHash]) {
        // The distance from start to the neighbor
        const tentativeGScore = gScore[currentPosHash] + 1;

        if (
          !openSet[neighbourHash] ||
          tentativeGScore < gScore[neighbourHash]
        ) {
          // This path is the best until now, record it
          cameFrom[neighbourHash] = currentPos;
          gScore[neighbourHash] = tentativeGScore;
          fScore[neighbourHash] =
            tentativeGScore + manhattanDistance(neighbour, end);

          if (!openSet[neighbourHash]) {
            // Discover a new position
            openSet[neighbourHash] = neighbour;
          }
        }
      }
    });
  }

  return [];
};
