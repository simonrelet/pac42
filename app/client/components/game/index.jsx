'use strict';

import React, { PropTypes } from 'react';
import Phaser from 'phaser';
import io from 'socket.io-client';
import style from './style';

const mountingPoint = 'gane-mounting-point';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { url, port } = this.props.config.server;
    this.socket = io.connect(`${url}:${port}`);
    this.socket.on('greetings', (data, cb) => {
      cb({
        id: data.id,
        name: `player-${data.id}`,
        type: 'pacman'
      });
    });

    this.game = new Phaser.Game(480, 320, Phaser.AUTO, mountingPoint, {
      preload: this.preload.bind(this),
      create: this.create.bind(this),
      update: this.update.bind(this)
    });
  }

  componentWillUnmount() {
    this.socket.disconnect();
    this.socket = null;
  }

  preload() {
    this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
    this.game.stage.backgroundColor = '#eee';
  }

  create() {}

  update() {}

  render() {
    return (
      <div
        className={ style.game }
        id={ mountingPoint }
      />
    );
  }
}

Game.displayName = 'Game';
Game.propTypes = {
  config: PropTypes.shape({
    server: PropTypes.shape({
      url: PropTypes.string.isRequired,
      port: PropTypes.number.isRequired
    }).isRequired
  }).isRequired
};
