const SIMPLE_MAP_CENTER = { line: 11, column: 28 };
const SIMPLE_MAP_TILES = `#########################################################
#########################################################
##.....................................................##
##.###########.##.##.##.#########.##.##.##.###########.##
##.###########.##.##.##.#########.##.##.##.###########.##
##.##..........##.##....##.....##....##.##..........##.##
##.##.##.#####.##.#####.##.###.##.#####.##.#####.##.##.##
##.##.##.#####.##.#####.##.###.##.#####.##.#####.##.##.##
##....##.......##.##.................##.##.......##....##
##.########.#####.##.##.####.####.##.##.#####.########.##
##.########.#####.##.##.####.####.##.##.#####.########.##
##...................##.##.....##.##...................##
##.#####.########.##.##.#########.##.##.########.#####.##
##.#####.########.##.##.#########.##.##.########.#####.##
##.##....##.......##.................##.......##....##.##
##.##.##.##.##.##.#####.#########.#####.##.##.##.##.##.##
...##.##.##.##.##.#####.#########.#####.##.##.##.##.##...
##.##.......##.##....##....###....##....##.##.......##.##
##.##.########.#####.##.##.###.##.##.#####.########.##.##
##.##.########.#####.##.##.###.##.##.#####.########.##.##
##.............##.......##.....##.......##.............##
##.########.#####.##.###############.##.#####.########.##
##.########.#####.##.###############.##.#####.########.##
##................##.................##................##
#########################################################
#########################################################`;

const parse = tilesStr =>
  tilesStr
    .trim()
    .split(/\n/)
    .map((line, l) =>
      line
        .split('')
        .map((char, column) => ({ wall: char === '#', line: l, column })),
    );

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const getRandomPosition = (tiles, accept) => {
  const nbLines = tiles.length;
  const nbColumns = tiles[0].length;

  const pos = {
    line: random(2, nbLines - 2),
    column: random(2, nbColumns - 2),
  };

  if (!accept(tiles[pos.line][pos.column])) {
    pos.column =
      pos.column + 1 + tiles[pos.line].slice(pos.column + 1).findIndex(accept);
  }

  return pos;
};

const getRandomGhostPosition = center => {
  return {
    line: center.line,
    column: center.column - 2 + Math.floor(Math.random() * 5),
  };
};

const isCentralPosition = (center, pos) => {
  return (
    // the center zone
    (pos.line === center.line &&
      pos.column >= center.column - 2 &&
      pos.column <= center.column + 2) ||
    // the entry of the center zone
    (pos.column === center.column &&
      (pos.line === center.line - 1 || pos.line === center.line - 2))
  );
};

const getRandomPacmanPosition = (tiles, center) =>
  getRandomPosition(
    tiles,
    tile => !tile.wall && !isCentralPosition(center, tile),
  );

const getRandomTypedPosition = (tiles, center) => {
  return ({ type }) =>
    type === 'ghost'
      ? getRandomGhostPosition(center)
      : getRandomPacmanPosition(tiles, center);
};

const getAnyRandomPosition = tiles => () =>
  getRandomPosition(tiles, tile => !tile.wall);

const isValidPosition = tiles => {
  const nbLines = tiles.length;
  const nbColumns = tiles[0].length;
  return ({ line, column }) =>
    line >= 0 &&
    line < nbLines &&
    column >= 0 &&
    column < nbColumns &&
    !tiles[line][column].wall;
};

const create = () => {
  const tiles = parse(SIMPLE_MAP_TILES);
  const center = SIMPLE_MAP_CENTER;
  return {
    tiles,
    center,
    getRandomTypedPosition: getRandomTypedPosition(tiles, center),
    getRandomPosition: getAnyRandomPosition(tiles),
    isValidPosition: isValidPosition(tiles),
  };
};

export default { create };
