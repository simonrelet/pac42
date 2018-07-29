import PropTypes from 'prop-types'
import React from 'react'
import { Motion, spring, presets } from 'react-motion'

const MAX_SPREAD_ANGLE = (3 * Math.PI) / 8

function MouthMotion({ children, open, onRest, ...props }) {
  return (
    <Motion
      defaultStyle={{
        angle: open ? 0 : MAX_SPREAD_ANGLE,
      }}
      style={{
        angle: spring(open ? MAX_SPREAD_ANGLE : 0, presets.stiff),
      }}
      onRest={() => onRest && setTimeout(onRest, 0)}
      {...props}
    >
      {({ angle }) => children(angle)}
    </Motion>
  )
}

MouthMotion.propTypes = {
  children: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onRest: PropTypes.func,
}

export default MouthMotion
