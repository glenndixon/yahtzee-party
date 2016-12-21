import './YahtzeeGame.css';
import React, { Component } from 'react';
import Dice from './Dice';
import Boxes from './Boxes';
//import { mapValues } from './utils/board-values';
import isYahtzee from './utils/is-yahtzee';

class YahtzeeGame extends Component {
  constructor() {
    super();

    this.state = {
      dice: [1,2,3,4,5].map(value => ({ value })),
      rollPhase: 0,
      lockedBits: 0,
      scores: {},
      yahtzeeBonusCount: 0
    };
  }

  render() {
    const { dice, rollPhase, scores, yahtzeeBonusCount } = this.state;

    const board = rollPhase > 0 ? this._board() : null

    return (
      <div className="YahtzeeGame">
        <div className="YahtzeeGame__boxes">
          <Boxes board={board}
                 scores={scores}
                 yahtzeeBonusCount={yahtzeeBonusCount}
                 selectBox={this.selectBox.bind(this)} />
        </div>
        <div className="YahtzeeGame__dice">
          {dice.map((die, i) => (
            <div key={i} onClick={this.diceClick.bind(this, i)} className="YahtzeeGame__die">
              <Dice value={die.value}
                    lastRolled={die.lastRolled}
                    animate={!!die.lastRolled}
                    locked={this._isDieLocked(i)}
                    blank={rollPhase === 0} />
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

    this.setState({
      dice,
      rollPhase: this.state.rollPhase + 1
    });
  }

  selectBox(boxId, values) {
    if (this.state.rollPhase === 0) return;
    if (boxId in this.state.scores) return

    const newScore = {};
    newScore[boxId] = values[boxId];

    this.setState({
      scores: Object.assign({}, this.state.scores, newScore),
      yahtzeeBonusCount: this.state.yahtzeeBonusCount + (this._isYahtzeeBonus() ? 1 : 0)
    });
  }

  _board() {
    return this.state.dice.map(d => d.value);
  }

  _isYahtzeeBonus() {
    return this.state.scores.BOX_YAHTZEE && isYahtzee(this._board());
  }

  _isDieLocked(index) {
    return this.state.lockedBits & (1 << index)
  }

  _areAllLocked() {
    return this.state.lockedBits === 0b11111;
  }
}

export default YahtzeeGame;
