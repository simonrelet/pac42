import { arc } from 'd3-shape'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Directions from '../../core/Directions'
import DirectionMotion from './DirectionMotion'
import MouthMotion from './MouthMotion'

function translate(x, y) {
  return `translate(${x}, ${y})`
}

function rotate(deg) {
  return `rotate(${deg})`
}

function PacmanMotion({ children, direction, mouthOpen, onMouthRest }) {
  return (
    <DirectionMotion direction={direction}>
      {rotation => (
        <MouthMotion
          open={mouthOpen && direction !== Directions.NONE}
          onRest={onMouthRest}
        >
          {spreadAngle => children(rotation, spreadAngle)}
        </MouthMotion>
      )}
    </DirectionMotion>
  )
}

class Pacman extends Component {
  static propTypes = {
    pos: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }).isRequired,
    direction: PropTypes.oneOf(Directions.all),
    state: PropTypes.oneOf(['alive', 'dead']),
    color: PropTypes.string,
  }

  static defaultProps = {
    direction: Directions.NONE,
    state: 'alive',
    color: '#1976D2',
  }

  state = {
    mouthOpen: true,
  }

  static getDerivedStateFromProps(props) {
    if (props.direction === Directions.NONE) {
      return {
        mouthOpen: true,
      }
    }

    return null
  }

  handleMouthRest = () => {
    this.setState(({ mouthOpen }) => ({
      mouthOpen: !mouthOpen,
    }))
  }

  renderPath(spreadAngle) {
    const path = arc()({
      innerRadius: 0,
      outerRadius: 15,
      startAngle: spreadAngle,
      endAngle: 2 * Math.PI - spreadAngle,
    })

    return <path d={path} fill={this.props.color} />
  }

  render() {
    if (this.props.state !== 'alive') {
      return null
    }

    const translation = translate(this.props.pos.x + 8, this.props.pos.y + 8)

    return (
      <PacmanMotion
        direction={this.props.direction}
        mouthOpen={
          this.state.mouthOpen && this.props.direction !== Directions.NONE
        }
        onMouthRest={this.handleMouthRest}
      >
        {(rotation, spreadAngle) => (
          <g transform={[translation, rotate(rotation)].join(' ')}>
            {this.renderPath(spreadAngle)}
          </g>
        )}
      </PacmanMotion>
    )
  }
}

export default Pacman
