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

//TODO : https://github.com/HenrikJoreteg/create-keyframe-animation
class Dice extends Component {
  render() {
    return (
      <div className="Dice">
        <div className="Dice__cube">
          {FACES.map((pips, i) => <div className={`Dice__face Dice__face--${i + 1}`} key={i}>
            {pips.map((pip, j) => <div className={`Dice__pip Dice__pip--${pip}`} key={j}></div>)}
          </div>)}
        </div>
      </div>
    );
  }
}

export default Dice;
