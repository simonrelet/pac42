'use strict';

import React, { PropTypes } from 'react';
import PlayerSelection from './player-selection';
import bindThis from 'utils/bind-this';
import style from './style';

export default class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      playerName: '',
      selectedPlayer: 'none'
    };

    bindThis(this, [
      'handleChange',
      'handleSubmit',
      'handlePlayerSelection',
      'canPlay'
    ]);
  }

  canPlay() {
    const { playerName, selectedPlayer } = this.state;

    return playerName.trim() !== ''
      && selectedPlayer !== 'none';
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ playerName: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.context.router.push({ pathname: '/game' });
  }

  handlePlayerSelection(player) {
    this.setState({ selectedPlayer: player });
  }

  render() {
    return (
      <div className={ style.login }>
        <h1 className={ style.title }>Pac42</h1>
        <PlayerSelection
          selected={ this.state.selectedPlayer }
          onSelection={ this.handlePlayerSelection }
        />
        <form
          className={ style.form }
          onSubmit={ this.handleSubmit }
        >
          <input
            autoFocus
            className={ style.input }
            placeholder='Name'
            type='text'
            value={ this.state.playerName }
            onChange={ this.handleChange }
          />
          <button
            className={ style.button }
            disabled={ !this.canPlay() }
          >
            Start
          </button>
        </form>
      </div>
    );
  }
}

Login.displayName = 'Login';
Login.contextTypes = {
  router: PropTypes.object.isRequired
};
