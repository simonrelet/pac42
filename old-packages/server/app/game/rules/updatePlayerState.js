import { TILE_SIZE, PLAYER_SIZE } from '../constants';
import { toAbsolutePosition } from '../positions';

const toPlayerPos = ({ x, y }) => ({
  x: x - (PLAYER_SIZE - TILE_SIZE) / 2,
  y: y - (PLAYER_SIZE - TILE_SIZE) / 2,
});

const intersects = (a, b) => {
  const aPlayer = toPlayerPos(a);
  const bPlayer = toPlayerPos(b);
  return !(
    aPlayer.x + PLAYER_SIZE < bPlayer.x ||
    bPlayer.x + PLAYER_SIZE < aPlayer.x ||
    aPlayer.y + PLAYER_SIZE < bPlayer.y ||
    bPlayer.y + PLAYER_SIZE < aPlayer.y
  );
};

const getCollisionList = ({ id, pos, type }, players) =>
  players.filter(
    otherPlayer =>
      otherPlayer.state === 'alive' &&
      otherPlayer.type !== type &&
      intersects(pos, otherPlayer.pos),
  );

const stopEffect = player => ({
  ...player,
  effect: null,
  stopEffectAt: null,
});

const killPlayer = player =>
  stopEffect({
    ...player,
    state: 'dead',
    direction: null,
    resurectAt: Date.now() + 5000,
  });

const resurectPlayer = (map, player) => ({
  ...player,
  state: 'alive',
  resurectAt: null,
  pos: toAbsolutePosition(map.getRandomTypedPosition(player)),
});

const updateAlivePlayer = (player, players) => {
  const collisionWith = getCollisionList(player, players);
  if (collisionWith.length) {
    if (player.type === 'pacman') {
      if (collisionWith.some(({ effect }) => effect !== 'scared')) {
        return killPlayer(player);
      }
    } else if (player.effect === 'scared') {
      return killPlayer(player);
    }
  }

  if (player.stopEffectAt <= Date.now()) {
    return stopEffect(player);
  }

  return player;
};

const updateDeadPlayer = (map, player) => {
  if (player.resurectAt <= Date.now()) {
    return resurectPlayer(map, player);
  }
  return player;
};

export default map => (player, _, players) => {
  switch (player.state) {
    case 'alive':
      return updateAlivePlayer(player, players);
    case 'dead':
      return updateDeadPlayer(map, player);
    default:
      return player;
  }
};
