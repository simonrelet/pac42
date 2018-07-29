import React, { Component } from 'react'
import { I18n } from 'react-i18next'
import AppView from './AppView'

class AppContainer extends Component {
  state = {
    error: null,
  }

  componentDidCatch(error) {
    this.setState({ error })
  }

  render() {
    return (
      <I18n>
        {translate => <AppView translate={translate} {...this.state} />}
      </I18n>
    )
  }
}

export default AppContainer
