import React, { Component } from 'react';
import { withTheme } from 'react-jss';
import PropTypes from 'prop-types';
import getEyesForDirection from './getEyesForDirection';

const nbSteps = 32;
const maxAmplitude = 6;
const getAmplitude = step =>
  Math.abs(maxAmplitude * 2 / nbSteps * (step - 16)) - 3;

class Ghost extends Component {
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
    const amplitude = getAmplitude(step);
    const fill = theme.playerColors[id];

    const path =
      `M${centerX - 15},${centerY + 10}` +
      'c0,-15 0,-25 15,-25 s15,10 15,25' +
      `c0,${amplitude} ${-amplitude / 2},${2 + amplitude} -3,${2 + amplitude}` +
      `c-3,0 -3,${-amplitude * 2} -6,${-amplitude * 2}` +
      `s-3,${amplitude * 2} -6,${amplitude * 2}` +
      `s-3,${-amplitude * 2} -6,${-amplitude * 2}` +
      `s-3,${amplitude * 2} -6,${amplitude * 2}` +
      `c${-amplitude / 2},0 -3,${-amplitude / 2} -3,${-(2 + amplitude)}`;

    const eyes = getEyesForDirection(direction, { centerX, centerY });

    return (
      <g>
        <path d={path} fill={fill} />
        {eyes}
      </g>
    );
  }
}

export default withTheme(Ghost);
