import { TILE_SIZE } from './constants';

const DIRECTIONS = [
  { key: 'top', increment: { column: 0, line: -1 } },
  { key: 'right', increment: { column: 1, line: 0 } },
  { key: 'bottom', increment: { column: 0, line: 1 } },
  { key: 'left', increment: { column: -1, line: 0 } },
];
const NO_DIRECTION = 'none';
const NO_DIRECTION_INCREMENT = { column: 0, line: 0 };

export const directions = DIRECTIONS.map(d => d.key);

export const addPosition = (a, b) => ({
  line: a.line + b.line,
  column: a.column + b.column,
});

export const isEqual = (a, b) =>
  !!a && !!b && a.line === b.line && a.column === b.column;

export const toAbsolutePosition = ({ line, column }) => ({
  x: column * TILE_SIZE,
  y: line * TILE_SIZE,
});

export const toTilePosition = ({ x, y }) => ({
  line: Math.floor((y + TILE_SIZE / 2) / TILE_SIZE),
  column: Math.floor((x + TILE_SIZE / 2) / TILE_SIZE),
});

export const getDirection = (from, to) => {
  const increment = {
    line: to.line - from.line,
    column: to.column - from.column,
  };

  const res = DIRECTIONS.find(d => isEqual(d.increment, increment));
  return res ? res.key : NO_DIRECTION;
};

export const getDirectionIncrement = direction => {
  const res = DIRECTIONS.find(d => d.key === direction);
  return res ? res.increment : NO_DIRECTION_INCREMENT;
};

export const getOpositeDirection = direction => {
  switch (direction) {
    case 'top':
      return 'bottom';
    case 'right':
      return 'left';
    case 'bottom':
      return 'top';
    case 'left':
      return 'right';
    default:
      return '';
  }
};
