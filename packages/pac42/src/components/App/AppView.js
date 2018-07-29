import PropTypes from 'prop-types'
import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import loadComponent from '../../core/loadComponent'

const Demo = loadComponent(() => import('../../pages/Demo'))

function AppView({ error, translate }) {
  if (error) {
    return <p>{translate('global.errorMessage')}</p>
  }

  return (
    <Switch>
      <Route path="/demo" component={Demo} />

      <Route path="*" render={() => <Redirect to="/demo" />} />
    </Switch>
  )
}

AppView.propTypes = {
  error: PropTypes.object,
  translate: PropTypes.func.isRequired,
}

export default AppView
