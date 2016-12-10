import React, { Component } from 'react';
import './Dice.css';
import { Motion, spring } from 'react-motion';



const FACES = [
  ['c'],
  ['tl', 'br'],
  ['tl', 'c', 'br'],
  ['tl', 'tr', 'bl', 'br'],
  ['tl', 'tr', 'c', 'bl', 'br'],
  ['tl', 'tr', 'bl', 'br', 'l', 'r'],
];

const TRANSFORMS = [
  [0, 0, 0, 0],
  [0, 1, 0, 90],
];

//TODO : https://github.com/HenrikJoreteg/create-keyframe-animation
class Dice extends Component {
  constructor() {
    super();

    this.state = {
      value: 1,
      random: 0
    };
  }

  render() {
    return (
      <div className="Dice" onClick={this.blah.bind(this)}>
        <Motion style={{x: spring(this.state.x)}}>
          {({x}) => <div className="Dice__cube" style={{transform: `rotate3d(1, 1, 3, ${x}deg)`}}>
              {FACES.map((pips, i) => <div className={`Dice__face Dice__face--${i + 1}`} key={i}>
                {pips.map((pip, j) => <div className={`Dice__pip Dice__pip--${pip}`} key={j}></div>)}
              </div>)}
            </div>
          }
        </Motion>
      </div>
    );
  }

  componentWillUpdate() {

  }

  blah() {
    this.setState({
      value: Math.floor(Math.random() * 6) + 1,
      random: Math.random()
    });
  }
}

export default Dice;
