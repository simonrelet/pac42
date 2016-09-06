/* eslint no-console: "off" */
'use strict';

const arrayOfSize = require('../utils/array-of-size');

const BLOCK_EMPTY = '_';
const BLOCK_WALL = '#';

function dump(m) {
  m.forEach(line => {
    console.log(line.join(' '));
  });
}

function getInitialMap(bp, nbLines, nbColumns) {
  const halfMap = arrayOfSize(nbLines * 3 + 1).map(_ => (
    arrayOfSize(nbColumns * 3 + 1).map(_ => BLOCK_EMPTY)
  ));

  bp.forEach((_, line) => {
    _.forEach((_, column) => {
      const hLine = line * 3;
      const hColumn = column * 3;

      for (let l = hLine + 1; l < hLine + 3; l++) {
        for (let c = hColumn + 1; c < hColumn + 3; c++) {
          halfMap[l][c] = BLOCK_WALL;
        }
      }

      const group = bp[line][column];
      let hasLeftSibling = false;
      let hasTopSibling = false;
      if (column - 1 >= 0 && group === bp[line][column - 1]) {
        halfMap[hLine + 1][hColumn] = BLOCK_WALL;
        halfMap[hLine + 2][hColumn] = BLOCK_WALL;
        hasLeftSibling = true;
      }

      if (line - 1 >= 0 && group === bp[line - 1][column]) {
        halfMap[hLine][hColumn + 1] = BLOCK_WALL;
        halfMap[hLine][hColumn + 2] = BLOCK_WALL;
        hasTopSibling = true;
      }

      if (hasLeftSibling
        && hasTopSibling
        && group === bp[line - 1][column - 1]) {
        halfMap[hLine][hColumn] = BLOCK_WALL;
      }
    });
  });

  return halfMap;
}

function fillMap(bp, halfMap) {
  bp.forEach((_, line) => {
    _.forEach((_, column) => {
      const hLine = line * 3;
      const hColumn = column * 3;
      const group = bp[line][column];
      let hasLeftSibling = false;
      let hasTopSibling = false;

      if (column - 1 >= 0 && group === bp[line][column - 1]) {
        halfMap[hLine + 1][hColumn] = BLOCK_WALL;
        halfMap[hLine + 2][hColumn] = BLOCK_WALL;
        hasLeftSibling = true;
      }

      if (line - 1 >= 0 && group === bp[line - 1][column]) {
        halfMap[hLine][hColumn + 1] = BLOCK_WALL;
        halfMap[hLine][hColumn + 2] = BLOCK_WALL;
        hasTopSibling = true;
      }

      if (hasLeftSibling
        && hasTopSibling
        && group === bp[line - 1][column - 1]) {
        halfMap[hLine][hColumn] = BLOCK_WALL;
      }
    });
  });
}

function clearCenterArea(halfMap, nbLines, nbColumns) {
  const midLines = Math.floor(nbLines / 2);
  for (let l = (midLines - 1) * 3; l < (1 + midLines) * 3 - 2; l++) {
    halfMap[l][1] = BLOCK_EMPTY;
  }

  halfMap[(1 + midLines) * 3 - 3][2] = BLOCK_EMPTY;
  halfMap[(1 + midLines) * 3 - 3][3] = BLOCK_EMPTY;

  for (let c = 1; c < 6; c++) {
    halfMap[(midLines - 1) * 3][c] = BLOCK_EMPTY;
    halfMap[(midLines - 1) * 3 + 6][c] = BLOCK_EMPTY;
  }

  for (let l = (midLines - 1) * 3; l < (1 + midLines) * 3 + 1; l++) {
    halfMap[l][6] = BLOCK_EMPTY;
  }

  return {
    line: (1 + midLines) * 3 - 1,
    column: 1 + nbColumns * 3
  };
}

function createBottomBorder(halfMap, bp, groupsCount, nbLines, nbColumns) {
  const lastLine = bp[nbLines - 1];
  let min = {
    column: 0,
    groupCount: groupsCount[lastLine[0]] * 2,
    groupId: lastLine[0]
  };

  for (let c = 1; c < nbColumns; c++) {
    const g = lastLine[c];
    const gCount = groupsCount[g];

    if (g !== min.groupId && gCount < min.groupCount) {
      min = {
        groupCount: gCount,
        column: c,
        groupId: g
      };
    }
  }

  for (let c = min.column * 3 + 1;
    c < nbColumns * 3 && lastLine[Math.floor(c / 3)] === min.groupId;
    c++) {
    halfMap[nbLines * 3][c] = BLOCK_WALL;
  }

  if (halfMap[nbLines * 3][nbColumns * 3 - 1] === BLOCK_WALL) {
    for (let l = nbLines * 3 - 1;
      l >= 0 && bp[Math.floor(l / 3)][nbColumns - 1] === min.groupId;
      l--) {
      halfMap[l + 1][nbColumns * 3] = BLOCK_WALL;
    }
  }
}

function createFinalMap(halfMap, nbLines, nbColumns) {
  const size = {
    nbLines: (nbLines * 3) + 5,
    nbColumns: nbColumns * 6 + 3
  };

  const map = arrayOfSize(size.nbLines).map(_ => (
    arrayOfSize(size.nbColumns).map(_ => BLOCK_WALL)
  ));

  for (let l = 2; l < size.nbLines - 2; l++) {
    for (let c = 2; c <= Math.floor(size.nbColumns / 2); c++) {
      map[l][c] = halfMap[l - 2][nbColumns * 3 + 2 - c];
    }
  }

  for (let l = 2; l < size.nbLines - 2; l++) {
    for (let c = 1 + Math.floor(size.nbColumns / 2); c < size.nbColumns - 2; c++) {
      map[l][c] = halfMap[l - 2][c + 2 - (1 + Math.floor(size.nbColumns / 2))];
    }
  }

  return { map, size };
}

module.exports = function(bp, groupsCount, nbLines, nbColumns) {
  const halfMap = getInitialMap(bp, nbLines, nbColumns);
  fillMap(bp, halfMap);
  const center = clearCenterArea(halfMap, nbLines, nbColumns);
  createBottomBorder(halfMap, bp, groupsCount, nbLines, nbColumns);
  dump(halfMap);

  const res = createFinalMap(halfMap, nbLines, nbColumns);
  console.log();
  dump(res.map);
  console.log(`center: ${JSON.stringify(center)}`);
  console.log(`size: ${JSON.stringify(res.size)}`);
};
