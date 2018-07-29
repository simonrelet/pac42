import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { getOtherProps } from 'react-behave'
import { Motion, spring } from 'react-motion'
import Directions from '../../core/Directions'

const directionsRotations = {
  [Directions.TOP]: 0,
  [Directions.NONE]: 0,
  [Directions.RIGHT]: 90,
  [Directions.BOTTOM]: 180,
  [Directions.LEFT]: 270,
}

class DirectionMotion extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    direction: PropTypes.oneOf(Directions.all).isRequired,
  }

  state = {
    rotation: directionsRotations[this.props.direction],
  }

  componentDidUpdate(prevProps) {
    if (prevProps.direction !== this.props.direction) {
      let rotation =
        directionsRotations[this.props.direction] -
        directionsRotations[prevProps.direction]

      if (Math.abs(rotation) === 270) {
        rotation = -(rotation % 180)
      }

      this.setState(state => ({ rotation: state.rotation + rotation }))
    }
  }

  render() {
    const otherProps = getOtherProps(DirectionMotion, this.props)
    return (
      <Motion
        defaultStyle={{
          rotation: this.state.rotation,
        }}
        style={{
          rotation: spring(this.state.rotation),
        }}
        {...otherProps}
      >
        {({ rotation }) => this.props.children(rotation % 360)}
      </Motion>
    )
  }
}

export default DirectionMotion
