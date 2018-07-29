import pick from 'lodash.pick'
import mergeWith from 'lodash.mergewith'
import defaultState from './defaultState'

const currentVersion = 1
const keysToStore = ['auth']

function parse(serializedJSON) {
  if (serializedJSON) {
    try {
      return JSON.parse(serializedJSON)
    } catch (e) {
      console.error('Could not parse stored item:', serializedJSON, e)
    }
  }
  return null
}

function upgrade(state, oldVersion) {
  return state
}

function replaceArray(objValue, srcValue) {
  if (Array.isArray(objValue)) {
    return srcValue
  }

  return undefined
}

function load() {
  const previousState = parse(localStorage.getItem('application'))

  if (!previousState) {
    return defaultState
  }

  let state = previousState.state
  if (previousState.version < currentVersion) {
    state = upgrade(previousState.state, previousState.version)
  }

  return mergeWith({}, defaultState, state, replaceArray)
}

function filterKeys(state) {
  return pick(state, keysToStore)
}

function save(state) {
  localStorage.setItem(
    'application',
    JSON.stringify({
      version: currentVersion,
      state: filterKeys(state),
    }),
  )
}

function clear() {
  localStorage.clear()
}

export default { load, save, clear }
