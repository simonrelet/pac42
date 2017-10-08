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

const getThemeNameOrDefault = theme => {
  const themeNames = Object.keys(themes);
  if (themeNames.some(name => name === theme)) {
    return theme;
  }
  return themeNames[0];
};

class App extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  htmlElement = null;
  state = {
    theme: getThemeNameOrDefault(localStorage.getItem('theme')),
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
