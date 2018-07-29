import React, { Component } from 'react';
import { withTheme } from 'react-jss';
import PropTypes from 'prop-types';

const nbSteps = 32;
const getAmplitude = step => Math.abs(0.5 * (step - 16)) - 4;

class ScaredGhost extends Component {
  static propTypes = {
    pos: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };

  state = {
    step: 0,
    colorBody: 0,
    colorFace: 1,
  };

  componentDidMount() {
    this.stepTimer = setInterval(this.nextSprite, 12);
    this.colorTimer = setInterval(this.nextColor, 500);
  }

  componentWillUnmount() {
    clearInterval(this.stepTimer);
    clearInterval(this.colorTimer);
  }

  nextSprite = () => {
    this.setState(({ step }) => ({
      step: (step + 1) % nbSteps,
    }));
  };

  nextColor = () => {
    const { theme: { scaredGhost: { colors } } } = this.props;

    this.setState(({ colorBody, colorFace }) => ({
      colorBody: (colorBody + 1) % colors.length,
      colorFace: (colorFace + 1) % colors.length,
    }));
  };

  render() {
    const { pos, state, theme } = this.props;
    if (state !== 'alive') {
      return null;
    }

    const { step, colorBody, colorFace } = this.state;
    const centerY = pos.y + 8;
    const centerX = pos.x + 8;
    const amplitude = getAmplitude(step);
    const fillBody = theme.scaredGhost.colors[colorBody];
    const fillFace = theme.scaredGhost.colors[colorFace];

    const path =
      `M${centerX - 15},${centerY + 12}` +
      'c0,-17 0,-27 15,-27 s15,10 15,27' +
      `c0,${amplitude} -4,${amplitude} -6,0 s-4,${-amplitude} -6,0 s-4,${amplitude} -6,0 s-4,${-amplitude} -6,0 s-6,${amplitude} -6,0`;

    const mouthPath = `M${centerX - 10},${centerY + 5}l5,-3l5,3l5,-3l5,3`;

    const face = (
      <g>
        <circle cx={centerX - 7} cy={centerY - 5} r="3" fill={fillFace} />
        <circle cx={centerX + 7} cy={centerY - 5} r="3" fill={fillFace} />
        <path
          d={mouthPath}
          stroke={fillFace}
          strokeLinecap="round"
          strokeWidth="2px"
          fill="none"
        />
      </g>
    );

    return (
      <g>
        <path d={path} fill={fillBody} />
        {face}
      </g>
    );
  }
}

export default withTheme(ScaredGhost);
