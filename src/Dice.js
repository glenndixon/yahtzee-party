import React, { Component } from 'react';
import './Dice.css';
import animations from 'create-keyframe-animation';

const FACES = [
  ['c'],
  ['tl', 'br'],
  ['tl', 'c', 'br'],
  ['tl', 'tr', 'bl', 'br'],
  ['tl', 'tr', 'c', 'bl', 'br'],
  ['tl', 'tr', 'bl', 'br', 'l', 'r'],
];

const TRANSFORMS = [
  [0, 1, 0, 0],
  [0, 1, 0, 270],
  [1, 0, 0, 270],
  [1, 0, 0, 90],
  [0, 1, 0, 90],
  [0, 1, 0, 180],
];

//TODO : https://github.com/HenrikJoreteg/create-keyframe-animation
class Dice extends Component {
  constructor() {
    super();

    this._currentTransform = 'rotate3d(0, 0, 0, 0deg)';

    this.state = {
      value: 1,
      random: 0
    };
  }

  render() {
    const style = {
      //transform: this._currentTransform
    };

    if (this._animationName) {
      style.animation = `1.5s linear ${this._animationName} 0s 1 normal both`;
    }
    return (
      <div className="Dice" onClick={this.blah.bind(this)}>
        <div className="Dice__cube" style={style}>
          {FACES.map((pips, i) => <div className={`Dice__face Dice__face--${i + 1}`} key={i}>
            {pips.map((pip, j) => <div className={`Dice__pip Dice__pip--${pip}`} key={j}></div>)}
          </div>)}
        </div>
      </div>
    );
  }

  componentWillUpdate() {
    const startingTransform = this._currentTransform;

    const config = TRANSFORMS[this.state.value - 1];
    this._currentTransform = `rotate3d(${config[0]}, ${config[1]}, ${config[2]}, ${config[3]}deg)`;
    this._animationName = `move${Math.floor(Math.random() * 10000000).toString(32)}`
    console.log(this.state.value);
    animations.registerAnimation({
      name: this._animationName,
      animation: {
        '0%': {
          transform: startingTransform
        },
        '20%': {
          transform: 'rotate3d(1, 3, 2, 500deg)'
        },
        '50%': {
          transform: 'rotate3d(1, 3, 2, 1000deg)'
        },
        '70%': {
          transform: 'rotate3d(1, 3, 2, 500deg)'
        },
        '100%': {
          transform: this._currentTransform
        }
      }
    });
  }

  blah() {
    this.setState({
      value: Math.floor(Math.random() * 6) + 1,
      random: Math.random()
    });
  }
}

export default Dice;
