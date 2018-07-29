import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import Pacman from '../Pacman';
import Ghost from '../Ghost';

const styles = theme => ({
  players: {
    position: 'absolute',
  },
});

const getPlayer = ({ type }) => {
  switch (type) {
    case 'pacman':
      return Pacman;
    case 'ghost':
    default:
      return Ghost;
  }
};

const Players = ({ classes, players, size: { height, width } }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${height}`}
      className={classes.players}
      height={height}
      width={width}
    >
      {players.map(player => {
        const Player = getPlayer(player);
        return <Player key={player.id} {...player} />;
      })}
    </svg>
  );
};

Players.propTypes = {
  classes: PropTypes.object.isRequired,
  size: PropTypes.object.isRequired,
  players: PropTypes.array.isRequired,
};

export default injectSheet(styles)(Players);
