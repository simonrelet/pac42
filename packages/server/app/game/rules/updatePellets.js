import { toTilePosition, isEqual } from '../positions';

const getRandomPelletType = () =>
  Math.floor(Math.random() * 100) === 0 ? 'super' : 'normal';

export default (pellets, players) => {
  let eaten = null;
  const newPellets = players.reduce((newPellets, player) => {
    if (player.state === 'alive') {
      const pos = toTilePosition(player.pos);

      if (player.type === 'pacman') {
        return newPellets.filter(pellet => {
          const eatPellet = isEqual(pellet.pos, pos);
          if (eatPellet && pellet.type !== 'normal') {
            eaten = eaten || {};
            eaten = { ...eaten, [pellet.type]: (eaten[pellet.type] || 0) + 1 };
          }
          return !eatPellet;
        });
      }

      if (!newPellets.some(pellet => isEqual(pellet.pos, pos))) {
        return [...newPellets, { pos, type: getRandomPelletType() }];
      }
    }
    return newPellets;
  }, pellets);

  return { eaten, pellets: newPellets };
};
