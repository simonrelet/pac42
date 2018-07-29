import PropTypes from 'prop-types'
import React from 'react'
import classes from './Home.module.scss'

function HomeView({ now, translate }) {
  return (
    <div className={classes.root}>
      <h1 className={classes.title}>{translate('home.title')}</h1>
      <p className={classes.date}>{now.format('LL - LTS')}</p>
    </div>
  )
}

HomeView.propTypes = {
  now: PropTypes.object.isRequired,
  translate: PropTypes.func.isRequired,
}

export default HomeView
