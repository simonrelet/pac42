'use strict';

import React, { PropTypes } from 'react';
import playerBlock from '../player-block';
import style from './style';

const GhostBlock = playerBlock(
  'ghost',
  {
    offset: -30 * 6,
    steps: [ 0, -30 ]
  },
  {
    offset: -30 * 8,
    steps: [ 0, -30 ]
  }
);

const PacmanBlock = playerBlock(
  'pacman',
  {
    offset: -30 * 6,
    steps: [ 0, -30, -60 ]
  },
  {
    offset: -30 * 12,
    steps: Array.apply(null, Array(12)).map((v, i) => -30 * i)
  }
);

export default function PlayerSelection({ selected, onSelection }) {
  return (
    <div className={ style.playerClass }>
      <GhostBlock
        selected={ selected === 'ghost' }
        onSelect={ () => onSelection('ghost') }
      />
      <PacmanBlock
        selected={ selected === 'pacman' }
        onSelect={ () => onSelection('pacman') }
      />
    </div>
  );
}

PlayerSelection.displayName = 'PlayerSelection';
PlayerSelection.propTypes = {
  selected: PropTypes.oneOf([
    'ghost',
    'pacman',
    'none'
  ]).isRequired,
  onSelection: PropTypes.func.isRequired
};
