import React, { Component, Fragment } from 'react'
import { I18n } from 'react-i18next'
import DocumentTitle from '../DocumentTitle'
import LoginView from './LoginView'

class LoginContainer extends Component {
  state = {}

  render() {
    return (
      <I18n>
        {translate => (
          <Fragment>
            <DocumentTitle title={translate('login.title')} />
            <LoginView translate={translate} {...this.state} {...this.props} />
          </Fragment>
        )}
      </I18n>
    )
  }
}

export default LoginContainer
