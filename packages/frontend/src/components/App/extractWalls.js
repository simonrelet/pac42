const getSimpleType = (tiles, { line, column }, { nbLines, nbColumns }) => {
  let mask = 0;
  if (line - 1 < 0 || !tiles[line - 1][column].wall) {
    mask = 4;
  } else if (line + 1 >= nbLines || !tiles[line + 1][column].wall) {
    mask = 1;
  }

  if (column - 1 < 0 || !tiles[line][column - 1].wall) {
    mask += 8;
  } else if (column + 1 >= nbColumns || !tiles[line][column + 1].wall) {
    mask += 2;
  }

  if (mask) {
    switch (mask) {
      case 1:
      case 4:
        return 'left-right';
      case 9:
        return 'top-right';
      case 12:
        return 'bottom-right';
      case 6:
        return 'left-bottom';
      case 3:
        return 'left-top';
      case 2:
      case 8:
      default:
        return 'top-bottom';
    }
  }

  return '';
};

const getAdvancedType = (tiles, { line, column }, { nbLines, nbColumns }) => {
  let mask = 0;
  if (!tiles[line - 1][column - 1].wall) {
    mask = 8;
  } else if (!tiles[line + 1][column + 1].wall) {
    mask = 2;
  }

  if (!tiles[line - 1][column + 1].wall) {
    mask = 4;
  } else if (!tiles[line + 1][column - 1].wall) {
    mask = 1;
  }

  switch (mask) {
    case 4:
      return 'top-right';
    case 2:
      return 'bottom-right';
    case 1:
      return 'left-bottom';
    case 8:
      return 'left-top';
    case 0:
    default:
      return 'dot';
  }
};

const transformWall = (tiles, tile, position, size) => {
  let type = getSimpleType(tiles, position, size);
  if (type) {
    return { ...tile, ...position, type };
  }
  type = getAdvancedType(tiles, position, size);
  return { ...tile, ...position, type };
};

export default tiles => {
  const walls = [];
  const nbLines = tiles.length;
  const nbColumns = tiles[0].length;
  const size = { nbLines, nbColumns };

  tiles.forEach((line, l) => {
    line.forEach((tile, column) => {
      if (tile.wall) {
        walls.push(transformWall(tiles, tile, { line: l, column }, size));
      }
    });
  });

  return walls;
};
