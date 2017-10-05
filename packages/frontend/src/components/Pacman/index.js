import React, { Component } from 'react';
import PropTypes from 'prop-types';

const getSteps = () => {
  const mouthXStart = 7;
  const mouthXEnd = 15;
  const mouthXStep = 0.5;
  const halfSteps = [...Array((mouthXEnd - mouthXStart) / mouthXStep)].map(
    (_, i) => mouthXStart + i * mouthXStep,
  );
  return [...halfSteps, mouthXEnd].concat([...halfSteps].reverse());
};

const steps = getSteps();

const colors = [
  '#1976D2',
  '#D32F2F',
  '#388E3C',
  '#FFA000',
  '#7B1FA2',
  '#0097A7',
  '#E64A19',
  '#AFB42B',
];

const getPathForDirection = (
  direction,
  { centerX, centerY },
  { mouthX, mouthY },
) => {
  switch (direction) {
    case 'left':
      return (
        `M${centerX - mouthX},${centerY + mouthY}` +
        'A15 15 0 1 0' +
        `${centerX - mouthX} ${centerY - mouthY} L${centerX + 3} ${centerY}z`
      );

    case 'top':
      return (
        `M${centerX - mouthY},${centerY - mouthX}` +
        'A15 15 0 1 0' +
        `${centerX + mouthY} ${centerY - mouthX} L${centerX} ${centerY + 3}z`
      );

    case 'bottom':
      return (
        `M${centerX - mouthY},${centerY + mouthX}` +
        'A15 15 0 1 1' +
        `${centerX + mouthY} ${centerY + mouthX} L${centerX} ${centerY - 3}z`
      );

    case 'right':
    default:
      return (
        `M${centerX + mouthX},${centerY + mouthY}` +
        'A15 15 0 1 1' +
        `${centerX + mouthX} ${centerY - mouthY} L${centerX - 3} ${centerY}z`
      );
  }
};

class Pacman extends Component {
  constructor(props) {
    super(props);
    this.state = { step: 0 };
  }

  componentDidMount() {
    this.timer = setInterval(this.nextSprite, 12);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  nextSprite = () => {
    this.setState(({ step }) => ({
      step: (step + 1) % steps.length,
    }));
  };

  render() {
    const { pos, direction, id } = this.props;
    const { step } = this.state;
    const centerY = pos.y + 8;
    const centerX = pos.x + 8;
    const mouthX = steps[step];
    const fill = colors[id];

    if (mouthX === 15) {
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

Pacman.propTypes = {
  pos: PropTypes.object.isRequired,
  direction: PropTypes.string.isRequired,
};

export default Pacman;
