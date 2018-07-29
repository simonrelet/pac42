import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router'

function GuardedRoute({
  test,
  component: Component,
  render,
  redirectTo,
  ...routeProps
}) {
  if (!Component && !render) {
    throw new Error("At least one of the props 'component' or 'render' must be provided.")
  }

  return (
    <Route
      {...routeProps}
      render={props => {
        if (test()) {
          return Component ? <Component {...props} /> : render(props)
        }

        return (
          <Redirect
            to={{
              pathname: redirectTo,
              state: { from: props.location },
            }}
          />
        )
      }}
    />
  )
}

GuardedRoute.propTypes = {
  component: PropTypes.func,
  redirectTo: PropTypes.string.isRequired,
  render: PropTypes.func,
  test: PropTypes.func.isRequired,
}

export default GuardedRoute
