import aStar from './aStar';
import { toTilePosition, isEqual, getDirection } from '../positions';

const getRandomPosition = (currentPos, map) => {
  let pos;
  do {
    pos = map.getRandomPosition();
  } while (isEqual(pos, currentPos));
  return pos;
};

const create = (logger, id, map) => {
  const state = {
    destinationPos: null,
    path: null,
  };

  const resetState = () => {
    state.destinationPos = null;
    state.path = null;
  };

  return {
    play: environment => {
      const my = environment.state.players.find(p => p.id === id);
      if (my.state !== 'alive') {
        resetState();
        return;
      }

      const currentPos = toTilePosition(my.pos);

      logger.info('Current position:', currentPos);

      if (isEqual(currentPos, state.destinationPos)) {
        resetState();
      }

      if (!state.destinationPos) {
        // Find a new target position
        state.destinationPos = getRandomPosition(currentPos, map);
        // remove the first position of the path as it is the current one
        state.path = aStar(currentPos, state.destinationPos, map).slice(1);
        logger.info('Targeting position:', state.destinationPos);
      }

      if (isEqual(currentPos, state.path[0])) {
        // Position was reached
        // Target the next one in the path
        state.path = state.path.slice(1);
      }

      const direction = getDirection(currentPos, state.path[0]);
      if (direction !== my.direction) {
        logger.info('direction', direction);
        environment.changeDirection(direction);
      }
    },
  };
};

export default player => ({ ...player, create });
