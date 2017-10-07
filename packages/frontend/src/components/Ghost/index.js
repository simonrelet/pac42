import React, { Component } from 'react';
import { withTheme } from 'react-jss';
import PropTypes from 'prop-types';
import getEyesForDirection from './getEyesForDirection';

const nbSteps = 32;
const getAmplitude = step => Math.abs(0.5 * (step - 16)) - 4;

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
    const { pos, direction, id, theme } = this.props;
    const { step } = this.state;
    const centerY = pos.y + 8;
    const centerX = pos.x + 8;
    const amplitude = getAmplitude(step);
    const fill = theme.playerColors[id];

    const path =
      `M${centerX - 15},${centerY + 12}` +
      'c0,-17 0,-27 15,-27 s15,10 15,27' +
      `c0,${amplitude} -4,${amplitude} -6,0 s-4,${-amplitude} -6,0 s-4,${amplitude} -6,0 s-4,${-amplitude} -6,0 s-6,${amplitude} -6,0`;

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
