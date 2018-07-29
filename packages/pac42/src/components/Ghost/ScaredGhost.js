import React, { Component } from 'react'
import PropTypes from 'prop-types'

const nbSteps = 32
const getAmplitude = step => Math.abs(0.5 * (step - 16)) - 4

const colors = ['#2962FF', '#fff']

class ScaredGhost extends Component {
  static propTypes = {
    pos: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }).isRequired,
    state: PropTypes.oneOf(['alive', 'dead']),
  }

  state = {
    step: 0,
    colorBody: 0,
    colorFace: 1,
  }

  componentDidMount() {
    this.stepTimer = setInterval(this.nextSprite, 12)
    this.colorTimer = setInterval(this.nextColor, 500)
  }

  componentWillUnmount() {
    clearInterval(this.stepTimer)
    clearInterval(this.colorTimer)
  }

  nextSprite = () => {
    this.setState(({ step }) => ({
      step: (step + 1) % nbSteps,
    }))
  }

  nextColor = () => {
    this.setState(({ colorBody, colorFace }) => ({
      colorBody: (colorBody + 1) % colors.length,
      colorFace: (colorFace + 1) % colors.length,
    }))
  }

  render() {
    if (this.props.state !== 'alive') {
      return null
    }

    const centerY = this.props.pos.y + 8
    const centerX = this.props.pos.x + 8
    const amplitude = getAmplitude(this.state.step)
    const fillBody = colors[this.state.colorBody]
    const fillFace = colors[this.state.colorFace]

    const path =
      `M${centerX - 15},${centerY + 12}` +
      'c0,-17 0,-27 15,-27 s15,10 15,27' +
      `c0,${amplitude} -4,${amplitude} -6,0 s-4,${-amplitude} -6,0 s-4,${amplitude} -6,0 s-4,${-amplitude} -6,0 s-6,${amplitude} -6,0`

    const mouthPath = `M${centerX - 10},${centerY + 5}l5,-3l5,3l5,-3l5,3`

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
    )

    return (
      <g>
        <path d={path} fill={fillBody} />
        {face}
      </g>
    )
  }
}

export default ScaredGhost
