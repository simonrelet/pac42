import React from 'react';
import PropTypes from 'prop-types';
import Pacman from '../Pacman';
import './index.css';

const switchType = player => {
  if (player.type === 'pacman') {
    return <Pacman key={player.id} {...player} />;
  }
  return null;
};

const Players = ({ players, size: { height, width } }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${height}`}
      className="Players"
      height={height}
      width={width}
    >
      {players.map(switchType)}
    </svg>
  );
};

Players.propTypes = {
  size: PropTypes.object.isRequired,
  players: PropTypes.array.isRequired,
};

export default Players;
