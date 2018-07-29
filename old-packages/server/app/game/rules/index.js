import updatePlayerPosition from './updatePlayerPosition';
import updatePlayerState from './updatePlayerState';
import updatePellets from './updatePellets';
import applyPelletEffect from './applyPelletEffect';

let typeID = 0;
const ADD_PLAYER = typeID++;
const REMOVE_PLAYER = typeID++;
const CHANGE_PLAYER_DIRECTION = typeID++;
const INITIAL_STATE = { players: [], pellets: [] };

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
          player.id === payload.id && player.state === 'alive'
            ? { ...player, nextDirection: payload.direction }
            : player,
      );
    default:
      return players;
  }
};

export const applyEvent = ({ players, pellets } = INITIAL_STATE, event) => ({
  pellets,
  players: applyPlayerEvent(players, event),
});

export const stateWillChange = map => ({ players, pellets }) => {
  let newPlayers = players
    .map(updatePlayerPosition(map))
    .map(updatePlayerState(map));

  const newPellets = updatePellets(pellets, newPlayers);
  if (newPellets.eaten) {
    newPlayers = newPlayers.map(applyPelletEffect(newPellets.eaten));
  }

  return {
    pellets: newPellets.pellets,
    players: newPlayers,
  };
};
