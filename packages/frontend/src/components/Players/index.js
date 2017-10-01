import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';

const getPacmanDirectionOffset = direction => {
  switch (direction) {
    case 'top':
      return 0;
    case 'right':
      return 9;
    case 'bottom':
      return 3;
    case 'left':
      return 6;
    default:
      return 0;
  }
};

const getGhostDirectionOffset = direction => {
  switch (direction) {
    case 'top':
      return 0;
    case 'right':
      return 6;
    case 'bottom':
      return 2;
    case 'left':
      return 4;
    default:
      return 0;
  }
};

const Pacman = ({ pos: { x, y }, direction, spriteIndex }) => {
  const style = {
    backgroundPositionX:
      -30 * (getPacmanDirectionOffset(direction) + spriteIndex),
    top: y - 7,
    left: x - 7,
  };
  return <div style={style} className="Player Player-pacman" />;
};

const Ghost = ({ pos: { x, y }, direction, type, spriteIndex }) => {
  const style = {
    backgroundPositionX:
      -30 * (getGhostDirectionOffset(direction) + spriteIndex),
    top: y - 7,
    left: x - 7,
  };
  return <div style={style} className={'Player Player-' + type} />;
};

class Players extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pacmanSpriteIndex: 0,
      ghostSpriteIndex: 0,
    };
  }

  componentDidMount() {
    this.timer = setInterval(this.nextSprite, 120);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  nextSprite = () => {
    this.setState(({ pacmanSpriteIndex, ghostSpriteIndex }) => ({
      pacmanSpriteIndex: (pacmanSpriteIndex + 1) % 3,
      ghostSpriteIndex: (ghostSpriteIndex + 1) % 2,
    }));
  };

  switchType = player => {
    const { pacmanSpriteIndex, ghostSpriteIndex } = this.state;

    if (player.type === 'pacman') {
      return (
        <Pacman key={player.id} {...player} spriteIndex={pacmanSpriteIndex} />
      );
    }
    if (player.type.startsWith('ghost')) {
      return (
        <Ghost key={player.id} {...player} spriteIndex={ghostSpriteIndex} />
      );
    }

    return null;
  };

  render() {
    const { style, players } = this.props;

    return (
      <div className="Players" style={style}>
        {players.map(this.switchType)}
      </div>
    );
  }
}

Players.propTypes = {
  style: PropTypes.object.isRequired,
  players: PropTypes.array.isRequired,
};

export default Players;
