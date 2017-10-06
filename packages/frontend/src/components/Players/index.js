import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import Pacman from '../Pacman';
import styles from './styles';

const switchType = player => {
  if (player.type === 'pacman') {
    return <Pacman key={player.id} {...player} />;
  }
  return null;
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
      {players.map(switchType)}
    </svg>
  );
};

Players.propTypes = {
  classes: PropTypes.object.isRequired,
  size: PropTypes.object.isRequired,
  players: PropTypes.array.isRequired,
};

export default injectSheet(styles)(Players);
