import loggers from './loggers';
import maps from './maps';
import { toAbsolutePosition } from './positions';
import environments from './environments';
import players from './players';
import random from './players/random';
import { applyEvent, stateWillChange, addPlayer } from './rules';

const PLAYERS_AI = [
  random({ name: 'Raymond', type: 'pacman' }),
  random({ name: 'Liza', type: 'pacman' }),
  random({ name: 'Frank', type: 'pacman' }),
  random({ name: 'Bob', type: 'pacman' }),
  random({ name: 'Blinky', type: 'ghost-red' }),
  random({ name: 'Pinky', type: 'ghost-pink' }),
  random({ name: 'Clyde', type: 'ghost-yellow' }),
  random({ name: 'Inky', type: 'ghost-cyan' }),
];
const logger = loggers('system');

const create = () => {
  const environment = environments.create();
  const map = maps.create();
  const playersInstances = [];

  logger.info('Adding players...');
  PLAYERS_AI.forEach((playerAI, id) => {
    const player = players.create(id, playerAI, environment, map);
    playersInstances.push(player);
    const position = map.getRandomPosition();
    logger.info('Adding ' + player.name + ' at pos:', position);
    environment.dispatch(
      addPlayer({
        id,
        type: player.type,
        pos: toAbsolutePosition(position),
      }),
    );
  });
  logger.success('Players added.');

  environment.start(applyEvent, stateWillChange(map));

  logger.info('Starting players...');
  playersInstances.forEach(player => player.start());
  logger.success('Players started.');

  return { map, environment };
};

export default { create };
