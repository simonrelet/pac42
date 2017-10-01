import { TILE_SIZE } from './constants';

let typeID = 0;
const ADD_PLAYER = typeID++;
const REMOVE_PLAYER = typeID++;
const CHANGE_PLAYER_DIRECTION = typeID++;
const POSITION_INCREMENT = 4;
const INITIAL_STATE = { players: [] };

export const addPlayer = payload => ({ type: ADD_PLAYER, payload });
export const removePlayer = payload => ({ type: REMOVE_PLAYER, payload });
export const changePlayerDirection = payload => ({
  type: CHANGE_PLAYER_DIRECTION,
  payload,
});

const applyPlayerEvent = (players, { type, payload }) => {
  switch (type) {
    case ADD_PLAYER:
      return [...players, payload];
    case REMOVE_PLAYER:
      return players.filter(player => player.id !== payload);
    case CHANGE_PLAYER_DIRECTION:
      return players.map(
        player =>
          player.id === payload.id
            ? { ...player, nextDirection: payload.direction }
            : player,
      );
    default:
      return players;
  }
};

export const applyEvent = ({ players } = INITIAL_STATE, event) => ({
  players: applyPlayerEvent(players, event),
});

const getDirectionIncrement = direction => {
  switch (direction) {
    case 'top':
      return { x: 0, y: -POSITION_INCREMENT };
    case 'right':
      return { x: POSITION_INCREMENT, y: 0 };
    case 'bottom':
      return { x: 0, y: POSITION_INCREMENT };
    case 'left':
      return { x: -POSITION_INCREMENT, y: 0 };
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

const updatePosition = map => player => {
  let pos;
  if (player.nextDirection) {
    pos = addPosition(player.pos, getDirectionIncrement(player.nextDirection));
    if (isValidPosition(map, pos)) {
      return {
        ...player,
        pos,
        direction: player.nextDirection,
        nextDirection: null,
      };
    }
  }

  if (player.direction) {
    pos = addPosition(player.pos, getDirectionIncrement(player.direction));
    if (isValidPosition(map, pos)) {
      return { ...player, pos };
    }
  }

  return { ...player, direction: null };
};

export const stateWillChange = map => newState => {
  const newPositions = newState.players.map(updatePosition(map));
  // TODO: handle collisions
  return { players: newPositions };
};
