const emptyArray = count => [...Array(count)];

const RESERVED_GROUP = 0;
const NEIGHBOURS = [
  { dl: -1, dc: 0 },
  { dl: 0, dc: 1 },
  { dl: 1, dc: 0 },
  { dl: 0, dc: -1 },
];

// const dump = m => {
//   m.forEach(l => {
//     console.log(l.map(g => `${g < 10 ? ' ' : ''}${g}`).join(' '));
//   });
// };

const addReservedSpace = (blueprint, groupsCount, nbLines) => {
  const middle = Math.floor(nbLines / 2);
  for (let l = middle - 1; l <= middle; l++) {
    for (let c = 0; c <= 1; c++) {
      groupsCount[blueprint[l][c]]--;
      blueprint[l][c] = RESERVED_GROUP;
      groupsCount[RESERVED_GROUP]++;
    }
  }
};

const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;
const lineExists = (line, nbLines) => line >= 0 && line < nbLines;
const columnExists = (column, nbColumns) => column >= 0 && column < nbColumns;
const positionExists = ({ line, column }, { nbLines, nbColumns }) =>
  lineExists(line, nbLines) && columnExists(column, nbColumns);

const isSquareOfGroup = (p1, p2, info) => {
  if (p1.line === p2.line) {
    const lineAbove = p1.line - 1;
    const lineBelow = p1.line + 1;

    return (
      (lineExists(lineAbove, info.nbLines) &&
        info.blueprint[lineAbove][p1.column] === info.group &&
        info.blueprint[lineAbove][p2.column] === info.group) ||
      (lineExists(lineBelow, info.nbLines) &&
        info.blueprint[lineBelow][p1.column] === info.group &&
        info.blueprint[lineBelow][p2.column] === info.group)
    );
  }

  const columnBefore = p1.column - 1;
  const columnAfter = p1.column + 1;

  return (
    (columnExists(columnBefore, info.nbColumns) &&
      info.blueprint[p1.line][columnBefore] === info.group &&
      info.blueprint[p2.line][columnBefore] === info.group) ||
    (columnExists(columnAfter, info.nbColumns) &&
      info.blueprint[p1.line][columnAfter] === info.group &&
      info.blueprint[p2.line][columnAfter] === info.group)
  );
};

export default ({ nbLines, nbColumns }) => {
  const blueprint = emptyArray(nbLines).map((_, l) =>
    emptyArray(nbColumns).map((_, c) => l * nbColumns + c + 1),
  );
  // console.log('initial:');
  // dump(blueprint);
  const groupsCount = emptyArray(nbLines * nbColumns + 1).map(_ => 1);
  groupsCount[0] = 0;

  addReservedSpace(blueprint, groupsCount, nbLines);

  // console.log('with reserved space:');
  // dump(blueprint);

  const nbIterations = 50 * (nbLines + nbColumns) / 2;
  for (let i = 0; i < nbIterations; i++) {
    const l = getRandomInt(0, nbLines);
    const c = getRandomInt(0, nbColumns);
    const group = blueprint[l][c];
    const groupCount = groupsCount[group];

    if (group === RESERVED_GROUP || groupCount > 4) {
      continue;
    }

    let nbNeighbours = getRandomInt(1, 5);
    if (groupCount >= 3) {
      nbNeighbours -= groupCount - 2;
    }

    for (let j = 0; j < nbNeighbours; j++) {
      const neighbour = NEIGHBOURS[getRandomInt(0, 4)];
      const nl = l + neighbour.dl;
      const nc = c + neighbour.dc;
      if (
        positionExists({ line: nl, column: nc }, { nbLines, nbColumns }) &&
        blueprint[nl][nc] !== RESERVED_GROUP &&
        blueprint[nl][nc] !== group &&
        !isSquareOfGroup(
          { line: l, column: c },
          { line: nl, column: nc },
          {
            nbLines,
            nbColumns,
            group,
            blueprint,
          },
        )
      ) {
        groupsCount[blueprint[nl][nc]]--;
        blueprint[nl][nc] = group;
        groupsCount[group]++;
      }
    }
  }

  // console.log('done:');
  // dump(blueprint);

  return { blueprint, groupsCount };
};
