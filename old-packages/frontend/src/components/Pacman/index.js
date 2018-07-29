import React, { Component } from 'react';
import { withTheme } from 'react-jss';
import PropTypes from 'prop-types';
import getPathForDirection from './getPathForDirection';

const nbSteps = 32;
const getMouthX = step => 15 - Math.abs(0.5 * (step - 16));

class Pacman extends Component {
  static propTypes = {
    pos: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    direction: PropTypes.string,
  };

  state = {
    step: 0,
  };

  componentDidMount() {
    this.timer = setInterval(this.nextSprite, 12);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  nextSprite = () => {
    this.setState(({ step }) => ({
      step: (step + 1) % nbSteps,
    }));
  };

  render() {
    const { pos, direction, id, state, theme } = this.props;
    if (state !== 'alive') {
      return null;
    }

    const { step } = this.state;
    const centerY = pos.y + 8;
    const centerX = pos.x + 8;
    const mouthX = getMouthX(step);
    const fill = theme.playerColors[id];

    if (mouthX === 15 /* || !direction*/) {
      return <circle cx={centerX} cy={centerY} r="15" fill={fill} />;
    }

    const mouthY = Math.sqrt(15 ** 2 - mouthX ** 2);
    const path = getPathForDirection(
      direction,
      { centerX, centerY },
      { mouthX, mouthY },
    );

    return <path d={path} fill={fill} />;
  }
}

export default withTheme(Pacman);
