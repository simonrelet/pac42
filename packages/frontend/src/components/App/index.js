import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet, { ThemeProvider } from 'react-jss';
import themes from './themes';
import Game from '../Game';

const styles = {
  app: {
    height: '100%',
  },
};

class App extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  htmlElement = null;
  state = {
    theme: localStorage.getItem('theme') || 'light',
  };

  componentDidMount() {
    this.htmlElement = document.getElementsByTagName('html')[0];
    this.setHTMLBackground(this.state.theme);
  }

  setHTMLBackground(theme) {
    this.htmlElement.setAttribute(
      'style',
      'background-color:' + themes[theme].background,
    );
  }

  handleChangeTheme = () => {
    console.log('changing theme');
    this.setState(({ theme }) => {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      this.setHTMLBackground(newTheme);
      return { theme: newTheme };
    });
  };

  render() {
    const { theme } = this.state;
    const { classes } = this.props;

    return (
      <ThemeProvider theme={themes[theme]}>
        <div className={classes.app}>
          <Game onChangeTheme={this.handleChangeTheme} themeName={theme} />
        </div>
      </ThemeProvider>
    );
  }
}

export default injectSheet(styles)(App);
