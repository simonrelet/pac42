import { TILE_SIZE } from '../constants';

const POSITION_INCREMENT = 4;

const getPlayerIncrement = ({ type, effect }) =>
  POSITION_INCREMENT -
  (type === 'ghost' && effect === 'scared' ? POSITION_INCREMENT / 2 : 0);

const getDirectionIncrement = (direction, player, increment) => {
  switch (direction) {
    case 'top':
      return { x: 0, y: -increment };
    case 'right':
      return { x: increment, y: 0 };
    case 'bottom':
      return { x: 0, y: increment };
    case 'left':
      return { x: -increment, y: 0 };
    default:
      return { x: 0, y: 0 };
  }
};

const addPosition = (a, b) => ({ x: a.x + b.x, y: a.y + b.y });

const isValidPosition = (map, pos) => {
  const topLine = Math.floor(pos.y / TILE_SIZE);
  const bottomLine = Math.floor((pos.y + TILE_SIZE - 1) / TILE_SIZE);
  const leftColumn = Math.floor(pos.x / TILE_SIZE);
  const rightColumn = Math.floor((pos.x + TILE_SIZE - 1) / TILE_SIZE);
  return (
    map.isValidPosition({ line: topLine, column: leftColumn }) &&
    map.isValidPosition({ line: topLine, column: rightColumn }) &&
    map.isValidPosition({ line: bottomLine, column: leftColumn }) &&
    map.isValidPosition({ line: bottomLine, column: rightColumn })
  );
};

export default map => player => {
  if (player.state !== 'alive') {
    return player;
  }

  const { direction, nextDirection, pos } = player;
  const increment = getPlayerIncrement(player);

  if (nextDirection && nextDirection !== direction) {
    // the player migh not be perfeclty aligned but the new direction is
    // reachable
    for (let i = 0; i < increment; i++) {
      const tmpPos = addPosition(
        addPosition(pos, getDirectionIncrement(direction, player, i)),
        getDirectionIncrement(nextDirection, player, increment - i),
      );
      if (isValidPosition(map, tmpPos)) {
        return {
          ...player,
          pos: tmpPos,
          direction: nextDirection,
          nextDirection: null,
        };
      }
    }
  }

  for (let i = increment; i > 0; i--) {
    const tmpPos = addPosition(
      pos,
      getDirectionIncrement(direction, player, i),
    );
    if (isValidPosition(map, tmpPos)) {
      return { ...player, pos: tmpPos };
    }
  }

  return { ...player, direction: null };
};
