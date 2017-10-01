const SIMPLE_MAP_CENTER = { line: 11, column: 28 };
const SIMPLE_MAP_TILES = `#########################################################
#########################################################
##                                                     ##
## ########### ## ## ## ######### ## ## ## ########### ##
## ########### ## ## ## ######### ## ## ## ########### ##
## ##          ## ##    ##     ##    ## ##          ## ##
## ## ## ##### ## ##### ## ### ## ##### ## ##### ## ## ##
## ## ## ##### ## ##### ## ### ## ##### ## ##### ## ## ##
##    ##       ## ##                 ## ##       ##    ##
## ######## ##### ## ## #### #### ## ## ##### ######## ##
## ######## ##### ## ## #### #### ## ## ##### ######## ##
##                   ## ##     ## ##                   ##
## ##### ######## ## ## ######### ## ## ######## ##### ##
## ##### ######## ## ## ######### ## ## ######## ##### ##
## ##    ##       ##                 ##       ##    ## ##
## ## ## ## ## ## ##### ######### ##### ## ## ## ## ## ##
## ## ## ## ## ## ##### ######### ##### ## ## ## ## ## ##
## ##       ## ##    ##    ###    ##    ## ##       ## ##
## ## ######## ##### ## ## ### ## ## ##### ######## ## ##
## ## ######## ##### ## ## ### ## ## ##### ######## ## ##
##             ##       ##     ##       ##             ##
## ######## ##### ## ############### ## ##### ######## ##
## ######## ##### ## ############### ## ##### ######## ##
##                ##                 ##                ##
#########################################################
#########################################################`;

const parse = tilesStr =>
  tilesStr
    .trim()
    .split(/\n/)
    .map(line => line.split('').map(char => ({ wall: char === '#' })));

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const getRandomPosition = tiles => {
  const nbLines = tiles.length;
  const nbColumns = tiles[0].length;

  return () => {
    const pos = {
      line: random(2, nbLines - 2),
      column: random(2, nbColumns - 2),
    };

    if (tiles[pos.line][pos.column].wall) {
      pos.column =
        pos.column +
        1 +
        tiles[pos.line].slice(pos.column + 1).findIndex(tile => !tile.wall);
    }

    return pos;
  };
};

const isValidPosition = tiles => pos => !tiles[pos.line][pos.column].wall;

const create = () => {
  const tiles = parse(SIMPLE_MAP_TILES);
  return {
    center: SIMPLE_MAP_CENTER,
    tiles,
    getRandomPosition: getRandomPosition(tiles),
    isValidPosition: isValidPosition(tiles),
  };
};

export default { create };
