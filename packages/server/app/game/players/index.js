import loggers from '../loggers';
import { changePlayerDirection } from '../rules';

const createEnvWrapper = (environment, id) => {
  return {
    state: environment.get(),
    changeDirection: direction => {
      environment.dispatch(changePlayerDirection({ id, direction }));
    },
  };
};

const create = (id, playerAI, environment, map) => {
  const name = playerAI.name + '-' + id;
  const logger = loggers(name);
  const player = playerAI.create(logger, id, map);

  return {
    name,
    type: playerAI.type,
    id,
    start: () => {
      setInterval(() => player.play(createEnvWrapper(environment, id)), 40);
    },
  };
};

export default { create };
