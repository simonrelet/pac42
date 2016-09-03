'use strict';

import React, { PropTypes } from 'react';
import { Router, Route, hashHistory } from 'react-router';
import Login from './components/login';
import Game from './components/game';
import config from '../config';
import './style';

function RouteWrapper({ route }) {
  return (
    <route.child config={ config } />
  );
}

RouteWrapper.displayName = 'RouteWrapper';
RouteWrapper.propTypes = {
  route: PropTypes.object.isRequired
};

function NoMatch() {
  return (
    <h1>404</h1>
  );
}

NoMatch.displayName = 'NoMatch';

export default function App() {
  return (
    <Router history={ hashHistory }>
      <Route
        component={ Login }
        path='/'
      />
      <Route
        child={ Game }
        component={ RouteWrapper }
        path='/game'
      />
      <Route
        component={ NoMatch }
        path='*'
      />
    </Router>
  );
}

App.displayName = 'App';
