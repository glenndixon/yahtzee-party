import './YahtzeeGame.css';
import React, { Component } from 'react';
import Dice from './Dice';
import { mapValues } from './utils/board-values';

class YahtzeeGame extends Component {
  constructor() {
    super();

    const dice = [1,2,3,4,5].map(value => ({ value }));
    this.state = { dice, rollPhase: 0, lockedBits: 0};
  }

  render() {
    const { dice, lockedBits, rollPhase } = this.state;

    return (
      <div className="YahtzeeGame">
        <div className="YahtzeeGame__dice">
          {dice.map((die, i) => (
            <div key={i} onClick={this.diceClick.bind(this, i)} className="YahtzeeGame__die">
              <Dice value={die.value} lastRolled={die.lastRolled} animate={!!die.lastRolled} locked={this._isDieLocked(i)} blank={rollPhase === 0} />
            </div>
          ))}
        </div>
        <button onClick={this.rollClick.bind(this)}>Roll</button>
      </div>
    );
  }

  diceClick(index) {
    if ([0, 3].includes(this.state.rollPhase)) return;

    this.setState({
      lockedBits: this.state.lockedBits ^ (1 << index)
    });
  }

  rollClick(e) {
    if (this.state.rollPhase === 3) return;

    const dice = this.state.dice.map((die, i) => {
      if (this._isDieLocked(i)) return die;

      // update the value and lastRolled for all the non-locked dice
      return Object.assign(die, {
        value: Math.floor(Math.random() * 6) + 1,
        lastRolled: new Date().getTime()
      });
    });

    const diceValues = this.state.dice.map(die => die.value);
    const values = mapValues(diceValues, {});

    this.setState({
      dice,
      rollPhase: this.state.rollPhase + 1
    });
  }

  _isDieLocked(index) {
    return this.state.lockedBits & (1 << index)
  }

  _areAllLocked() {
    return this.state.lockedBits === 0b11111;
  }
}

export default YahtzeeGame;
