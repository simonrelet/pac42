const easeIn = power => t => Math.pow(t, power)

const easeOut = power => t => 1 - Math.abs(Math.pow(t - 1, power))

const easeInOut = power => t => {
  return t < 0.5
    ? easeIn(power)(t * 2) / 2
    : easeOut(power)(t * 2 - 1) / 2 + 0.5
}

export default (options, cb, done) => {
  const { duration, power } = options
  let animationStart = null
  let animationID = null

  const step = timeStamp => {
    if (!animationStart) {
      animationStart = timeStamp
    }

    const progressTime = timeStamp - animationStart
    const progress = easeInOut(power)(Math.min(progressTime / duration, 1))

    cb(progress)

    if (progressTime < duration) {
      animationID = window.requestAnimationFrame(step)
    } else {
      animationID = null
      if (done) {
        done()
      }
    }
  }

  const start = () => {
    stop()
    animationStart = null
    animationID = window.requestAnimationFrame(step)
  }

  const stop = () => {
    if (animationID) {
      window.cancelAnimationFrame(animationID)
      animationID = null
    }
  }

  return { start, stop }
}
