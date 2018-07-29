import PropTypes from 'prop-types'
import React from 'react'
import { Helmet } from 'react-helmet'

const appName = process.env.REACT_APP_TITLE

function DocumentTitle({ title }) {
  return (
    <Helmet>
      <title>{title ? `${title} - ${appName}` : appName}</title>
    </Helmet>
  )
}

DocumentTitle.propTypes = {
  title: PropTypes.string,
}

DocumentTitle.defaultProps = {
  title: '',
}

export default DocumentTitle
