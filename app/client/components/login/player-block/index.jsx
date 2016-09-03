'use strict';

import React, { PropTypes } from 'react';
import classnames from 'classnames';
import bindThis from 'utils/bind-this';
import style from './style.scss';

export default function playerBlock(type, animation, specialAnimation) {
  class PlayerBlockInternal extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        step: 0,
        ...animation
      };

      bindThis(this, [
        'handleClick',
        'handleKeyPress',
        'animate',
        'setAnimationTimeout',
        'switchAnimationType'
      ]);
    }

    componentDidMount() {
      this.timer = setInterval(this.animate, 100);
      this.specialTimer = this.setAnimationTimeout('special');
    }

    componentWillUnmount() {
      clearInterval(this.timer);
      clearTimeout(this.specialTimer);
    }

    setAnimationTimeout(type) {
      this.specialTimer = setTimeout(
        this.switchAnimationType(type),
        type === 'special' ? 5000 : 1200
      );
    }

    animate() {
      const { step, steps } = this.state;
      this.setState({ step: (step + 1) % steps.length });
    }

    switchAnimationType(type) {
      return () => {
        if (type === 'special') {
          this.setState({
            step: 0,
            ...specialAnimation
          });
          this.setAnimationTimeout('default');
        } else {
          this.setState({
            step: 0,
            ...animation
          });
          this.setAnimationTimeout('special');
        }
      };
    }

    handleClick(e) {
      e.preventDefault();
      this.props.onSelect();
    }

    handleKeyPress(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.props.onSelect();
      }
    }

    render() {
      const classNames = classnames(
        style.playerBlock,
        { [style.selected]: this.props.selected }
      );

      const { offset, step, steps } = this.state;
      const backgroundStyle = {
        backgroundPosition: `${offset + steps[step]}px`
      };

      return (
        <div
          className={ classNames }
          tabIndex={ 0 }
          onClick={ this.handleClick }
          onKeyPress={ this.handleKeyPress }
        >
          <div
            className={ style[type] }
            style={ backgroundStyle }
          />
        </div>
      );
    }
  }

  PlayerBlockInternal.displayName = 'PlayerBlock';
  PlayerBlockInternal.propTypes = {
    selected: PropTypes.bool.isRequired,
    onSelect: PropTypes.func.isRequired
  };

  return PlayerBlockInternal;
}
