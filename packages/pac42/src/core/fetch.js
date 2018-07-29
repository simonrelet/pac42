import merge from 'lodash.merge'

// Get the token somehow.
const token = ''

export function statusIsA(status, range) {
  return status >= range && status < range + 100
}

const fetch = (url, options) => {
  let credentialsOptions = {}
  if (token) {
    credentialsOptions = {
      headers: { Authorization: `Bearer ${token}` },
    }
  }

  return window.fetch(url, merge({}, options, credentialsOptions))
}

export default fetch
