const toAbsolute = tilePosition => tilePosition * 16;

const initialPositions = {
  top: (line, column) => `M${toAbsolute(column) + 8},${toAbsolute(line)}`,
  bottom: (line, column) =>
    `M${toAbsolute(column) + 8},${toAbsolute(line + 1)}`,
  left: (line, column) => `M${toAbsolute(column)},${toAbsolute(line) + 8}`,
};

const wallTypeInitialPosition = {
  'left-right': {
    from: 'left',
    path: initialPositions.left,
  },
  'top-bottom': {
    from: 'top',
    path: initialPositions.top,
  },
  'bottom-right': {
    from: 'bottom',
    path: initialPositions.bottom,
  },
  'left-bottom': {
    from: 'left',
    path: initialPositions.left,
  },
  'left-top': {
    from: 'left',
    path: initialPositions.left,
  },
  'top-right': {
    from: 'top',
    path: initialPositions.top,
  },
};

const wallTypePaths = {
  'left-right': 'h16',
  'right-left': 'h-16',
  'top-bottom': 'v16',
  'bottom-top': 'v-16',
  'bottom-right': 'q0,-8 8,-8',
  'right-bottom': 'q-8,0 -8,8',
  'left-bottom': 'q8,0 8,8',
  'bottom-left': 'q0,-8 -8,-8',
  'top-left': 'q0,8 -8,8',
  'left-top': 'q8,0 8,-8',
  'right-top': 'q-8,0 -8,-8',
  'top-right': 'q0,8 8,8',
};

const getHashFunction = nbColumns => ({ line, column }) =>
  line * nbColumns + column;

const createGroupState = tilesToVisit => {
  const hash = Object.keys(tilesToVisit)[0];
  const { type, line, column } = tilesToVisit[hash];
  const { path, from } = wallTypeInitialPosition[type];
  return {
    line,
    column,
    hash,
    path: path(line, column),
    from,
  };
};

const createPathOfGroup = (hash, state, tilesToVisit) => {
  while (tilesToVisit[state.hash]) {
    const { type } = tilesToVisit[state.hash];
    delete tilesToVisit[state.hash];

    switch (type) {
      case 'left-right':
        if (state.from === 'left') {
          state.path += wallTypePaths['left-right'];
          state.column++;
        } else {
          state.path += wallTypePaths['right-left'];
          state.column--;
        }
        break;

      case 'top-bottom':
        if (state.from === 'top') {
          state.path += wallTypePaths['top-bottom'];
          state.line++;
        } else {
          state.path += wallTypePaths['bottom-top'];
          state.line--;
        }
        break;

      case 'bottom-right':
        if (state.from === 'bottom') {
          state.path += wallTypePaths['bottom-right'];
          state.from = 'left';
          state.column++;
        } else {
          state.path += wallTypePaths['right-bottom'];
          state.from = 'top';
          state.line++;
        }
        break;

      case 'left-bottom':
        if (state.from === 'left') {
          state.path += wallTypePaths['left-bottom'];
          state.from = 'top';
          state.line++;
        } else {
          state.path += wallTypePaths['bottom-left'];
          state.from = 'right';
          state.column--;
        }
        break;

      case 'left-top':
        if (state.from === 'left') {
          state.path += wallTypePaths['left-top'];
          state.line--;
          state.from = 'bottom';
        } else {
          state.path += wallTypePaths['top-left'];
          state.column--;
          state.from = 'right';
        }
        break;

      default:
      case 'top-right':
        if (state.from === 'top') {
          state.path += wallTypePaths['top-right'];
          state.column++;
          state.from = 'left';
        } else {
          state.path += wallTypePaths['right-top'];
          state.line--;
          state.from = 'bottom';
        }
        break;
    }

    state.hash = hash(state);
  }

  return state.path;
};

export default (walls, nbColumns) => {
  const paths = [];
  const hash = getHashFunction(nbColumns);

  const tilesToVisit = walls
    .filter(wall => wall.type !== 'dot')
    .reduce((acc, wall) => ({ ...acc, [hash(wall)]: wall }), {});

  while (Object.keys(tilesToVisit).length > 0) {
    paths.push(
      createPathOfGroup(hash, createGroupState(tilesToVisit), tilesToVisit),
    );
  }

  return paths;
};
