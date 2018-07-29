import React, { Component, Fragment } from 'react'
import { I18n } from 'react-i18next'
import moment from 'moment'
import DocumentTitle from '../DocumentTitle'
import HomeView from './HomeView'

class HomeContainer extends Component {
  _clock = null

  state = {
    now: moment(),
  }

  componentDidMount() {
    this._clock = setInterval(() => this.setState({ now: moment() }), 1000)
  }

  componentWillUnmount() {
    clearInterval(this._clock)
  }

  render() {
    return (
      <I18n>
        {translate => (
          <Fragment>
            <DocumentTitle title={translate('home.title')} />
            <HomeView translate={translate} {...this.state} {...this.props} />
          </Fragment>
        )}
      </I18n>
    )
  }
}

export default HomeContainer
