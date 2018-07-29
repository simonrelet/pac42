const Directions = {
  NONE: Symbol('none'),
  TOP: Symbol('top'),
  RIGHT: Symbol('right'),
  BOTTOM: Symbol('bottom'),
  LEFT: Symbol('left'),
}

const all = Object.values(Directions)

export default {
  ...Directions,
  all,
}
