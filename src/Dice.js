import React, { Component } from 'react';
import './Dice.css';

const FACES = [
  ['c'],
  ['tl', 'br'],
  ['tl', 'c', 'br'],
  ['tl', 'tr', 'bl', 'br'],
  ['tl', 'tr', 'c', 'bl', 'br'],
  ['tl', 'tr', 'bl', 'br', 'l', 'r'],
];

const NUM_ANIMATIONS = 2;

//TODO : https://github.com/HenrikJoreteg/create-keyframe-animation
class Dice extends Component {
  constructor() {
    super();

    this._animationIndex = Math.floor(Math.random() * NUM_ANIMATIONS);
  }

  render() {
    const spinClass = this.props.animate ? `spin-${this._animationIndex}` : '';

    return (
      <div className="Dice">
        <div className={spinClass}>
          <div className={`Dice__cube Dice__cube--${this.props.value}`}>
            {FACES.map((pips, i) => <div className={`Dice__face Dice__face--${i + 1}`} key={i}>
              {pips.map((pip, j) => <div className={`Dice__pip Dice__pip--${pip}`} key={j}></div>)}
            </div>)}
          </div>
        </div>
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps", nextProps);
    if (nextProps.animate && (nextProps.random !== this.props.random)) {
      this._animationIndex += Math.floor(Math.random() * (NUM_ANIMATIONS - 1) + 1);
      this._animationIndex = this._animationIndex % NUM_ANIMATIONS;
    }
  }
}

export default Dice;
