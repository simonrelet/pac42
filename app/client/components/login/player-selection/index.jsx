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
      <h3 className={ style.title }>Join a team</h3>
      <div className={ style.playerBlocks }>
        <GhostBlock
          selected={ selected === 'ghost' }
          onSelect={ () => onSelection('ghost') }
        />
        <div className={ style.subTitle }>VS</div>
        <PacmanBlock
          selected={ selected === 'pacman' }
          onSelect={ () => onSelection('pacman') }
        />
      </div>
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
