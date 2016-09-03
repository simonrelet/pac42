'use strict';

import React from 'react';
import Phaser from 'phaser';
import style from './style';

const mountingPoint = 'gane-mounting-point';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.game = new Phaser.Game(480, 320, Phaser.AUTO, mountingPoint, {
      preload: this.preload.bind(this),
      create: this.create.bind(this),
      update: this.update.bind(this)
    });
  }

  preload() {
    this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
    this.game.stage.backgroundColor = '#eee';
  }

  create() {
    console.log('Created');
  }

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

App.displayName = 'App';
App.propTypes = {};
