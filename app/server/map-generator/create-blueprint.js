/* eslint no-console: "off" */
'use strict';

const arrayOfSize = require('../utils/array-of-size');

const RESERVED_GROUP = 0;
const NEIGHBOURS = [
  { dl: -1, dc: 0 },
  { dl: 0, dc: 1 },
  { dl: 1, dc: 0 },
  { dl: 0, dc: -1 }
];

function dump(m) {
  m.forEach(line => {
    console.log(line.join('\t'));
  });
}

function addReservedSpace(bp, groupsCount, nbLines) {
  const middle = Math.floor(nbLines / 2);
  for (let l = middle - 1; l <= middle; l++) {
    for (let c = 0; c <= 1; c++) {
      groupsCount[bp[l][c]]--;
      bp[l][c] = RESERVED_GROUP;
      groupsCount[bp[l][c]]++;
    }
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function lineExists(line, nbLines) {
  return line >= 0 && line < nbLines;
}

function columnExists(column, nbColumns) {
  return column >= 0 && column < nbColumns;
}

function positionExists(pos, counts) {
  return lineExists(pos.line, counts.nbLines)
    && columnExists(pos.column, counts.nbColumns);
}

function pos(line, column) {
  return { line, column };
}

function isSquareOfGroup(p1, p2, info) {
  if (p1.line === p2.line) {
    const lineAbove = p1.line - 1;
    const lineBelow = p1.line + 1;

    return lineExists(lineAbove, info.nbLines)
      && info.bp[lineAbove][p1.column] === info.group
      && info.bp[lineAbove][p2.column] === info.group
      || lineExists(lineBelow, info.nbLines)
      && info.bp[lineBelow][p1.column] === info.group
      && info.bp[lineBelow][p2.column] === info.group;
  }

  const columnBefore = p1.column - 1;
  const columnAfter = p1.column + 1;

  return columnExists(columnBefore, info.nbColumns)
    && info.bp[p1.line][columnBefore] === info.group
    && info.bp[p2.line][columnBefore] === info.group
    || columnExists(columnAfter, info.nbColumns)
    && info.bp[p1.line][columnAfter] === info.group
    && info.bp[p2.line][columnAfter] === info.group;
}

module.exports = function(nbLines, nbColumns) {
  const bp = arrayOfSize(nbLines).map((_, l) => (
    arrayOfSize(nbColumns).map((_, c) => l * nbColumns + c + 1)
  ));
  const groupsCount = arrayOfSize(nbLines * nbColumns + 1).map(_ => 1);
  groupsCount[0] = 0;

  addReservedSpace(bp, groupsCount, nbLines);

  const nbIter = 50 * (nbLines + nbColumns) / 2;
  for (let i = 0; i < nbIter; i++) {
    const l = getRandomInt(0, nbLines);
    const c = getRandomInt(0, nbColumns);
    const group = bp[l][c];
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
      if (positionExists(pos(nl, nc), { nbLines, nbColumns })
        && bp[nl][nc] !== RESERVED_GROUP
        && bp[nl][nc] !== group
        && !isSquareOfGroup(pos(l, c), pos(nl, nc), { nbLines, nbColumns, group, bp })) {
        groupsCount[bp[nl][nc]]--;
        bp[nl][nc] = group;
        groupsCount[group]++;
      }
    }
  }

  dump(bp);
  console.log(`${groupsCount.length}: [${groupsCount.join(', ')}]`);

  return { bp, groupsCount };
};
