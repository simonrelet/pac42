import React, { Component } from 'react';
import { ThemeProvider } from 'react-jss';
import themes from './themes';
import Game from '../Game';

class App extends Component {
  state = {
    theme: themes.light,
  };

  render() {
    const { theme } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <Game />
      </ThemeProvider>
    );
  }
}

export default App;
