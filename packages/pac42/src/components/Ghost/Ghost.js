import React, { Component } from 'react'
import PropTypes from 'prop-types'
import getEyesForDirection from './getEyesForDirection'

const nbSteps = 32
const maxAmplitude = 6

function getAmplitude(step) {
  return Math.abs(((maxAmplitude * 2) / nbSteps) * (step - 16)) - 3
}

class Ghost extends Component {
  static propTypes = {
    pos: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }).isRequired,
    direction: PropTypes.oneOf(['top', 'right', 'bottom', 'left', 'none']),
    state: PropTypes.oneOf(['alive', 'dead']),
    color: PropTypes.string,
  }

  static defaultProps = {
    direction: 'none',
    state: 'alive',
    color: '#1976D2',
  }

  state = {
    step: 0,
  }

  componentDidMount() {
    this.timer = setInterval(this.nextSprite, 12)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  nextSprite = () => {
    this.setState(({ step }) => ({
      step: (step + 1) % nbSteps,
    }))
  }

  render() {
    if (this.props.state !== 'alive') {
      return null
    }

    const centerY = this.props.pos.y + 8
    const centerX = this.props.pos.x + 8
    const amplitude = getAmplitude(this.state.step)

    const path =
      `M${centerX - 15},${centerY + 10}` +
      'c0,-15 0,-25 15,-25 s15,10 15,25' +
      `c0,${amplitude} ${-amplitude / 2},${2 + amplitude} -3,${2 + amplitude}` +
      `c-3,0 -3,${-amplitude * 2} -6,${-amplitude * 2}` +
      `s-3,${amplitude * 2} -6,${amplitude * 2}` +
      `s-3,${-amplitude * 2} -6,${-amplitude * 2}` +
      `s-3,${amplitude * 2} -6,${amplitude * 2}` +
      `c${-amplitude / 2},0 -3,${-amplitude / 2} -3,${-(2 + amplitude)}`

    const eyes = getEyesForDirection(this.props.direction, { centerX, centerY })

    return (
      <g>
        <path d={path} fill={this.props.color} />
        {eyes}
      </g>
    )
  }
}

export default Ghost
