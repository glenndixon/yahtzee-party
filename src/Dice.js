import React, { Component } from 'react';
import './Dice.css';
import classnames from 'classnames';

const FACES = [
  ['c'],
  ['tl', 'br'],
  ['tl', 'c', 'br'],
  ['tl', 'tr', 'bl', 'br'],
  ['tl', 'tr', 'c', 'bl', 'br'],
  ['tl', 'tr', 'bl', 'br', 'l', 'r'],
];

const NUM_ANIMATIONS = 2;

class Dice extends Component {
  constructor() {
    super();

    this._animationIndex = Math.floor(Math.random() * NUM_ANIMATIONS);
  }

  render() {
    const { animate, locked, value, blank, clickable } = this.props;
    const spinClass = animate ? `spin-${this._animationIndex}` : '';
    const cls = classnames('Dice', {
      'Dice--black': locked,
      'Dice--blank': blank,
      'Dice--clickable': clickable
    });

    return (
      <div className={cls}>
        <div className={spinClass}>
          <div className={`Dice__cube Dice__cube--${value}`}>
            {FACES.map((pips, i) => <div className={`Dice__face Dice__face--${i + 1}`} key={i}>
              {pips.map((pip, j) => <div className={`Dice__pip Dice__pip--${pip}`} key={j}></div>)}
            </div>)}
          </div>
        </div>
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.animate && (nextProps.lastRolled !== this.props.lastRolled)) {
      this._animationIndex += Math.floor(Math.random() * (NUM_ANIMATIONS - 1) + 1);
      this._animationIndex = this._animationIndex % NUM_ANIMATIONS;
    }
  }
}

export default Dice;
