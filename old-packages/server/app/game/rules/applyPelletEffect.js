export default eatenPellets => {
  const superPellet = eatenPellets.super > 0;
  return player =>
    superPellet && player.state === 'alive' && player.type === 'ghost'
      ? {
          ...player,
          effect: 'scared',
          stopEffectAt: Date.now() + 5000,
        }
      : player;
};
