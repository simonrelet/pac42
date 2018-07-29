import React from 'react'
import loadable from 'react-loadable'

function loadComponent(loader) {
  return loadable({
    loader,
    loading: () => <p>Loading...</p>,
  })
}

export default loadComponent
