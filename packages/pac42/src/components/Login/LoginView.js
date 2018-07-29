import PropTypes from 'prop-types'
import React from 'react'
import classes from './Login.module.scss'

function LoginView({ translate }) {
  return (
    <div className={classes.root}>
      <h1 className={classes.title}>{translate('login.title')}</h1>
    </div>
  )
}

LoginView.propTypes = {
  translate: PropTypes.func.isRequired,
}

export default LoginView
