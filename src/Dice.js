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

class Dice extends Component {
  render() {
    const { locked, value, blank, clickable } = this.props;

    const cls = classnames('Dice', {
      'Dice--black': locked,
      'Dice--blank': blank,
      'Dice--clickable': clickable
    });

    return (
      <div className={cls}>
        <div ref={(div) => { this._spinNode = div; }}>
          <div className={`Dice__cube Dice__cube--${value}`}>
            {FACES.map((pips, i) => <div className={`Dice__face Dice__face--${i + 1}`} key={i}>
              {pips.map((pip, j) => <div className={`Dice__pip Dice__pip--${pip}`} key={j}></div>)}
            </div>)}
          </div>
        </div>
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.animate && prevProps.lastRolled !== this.props.lastRolled) {
      this._spinNode.className = '';
      setTimeout(() => {
        this._spinNode.className = `spin-${this.props.spinId}`;
      }, 0);
    }
  }
}

export default Dice;
