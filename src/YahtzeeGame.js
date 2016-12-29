import './YahtzeeGame.css';
import React, { Component } from 'react';
import Dice from './Dice';
import Boxes from './Boxes';
import values from './utils/values';
import sum from './utils/sum';
import isYahtzee from './utils/is-yahtzee';
import {
  upperSectionSum,
  UPPER_SECTION_BONUS,
  UPPER_SECTION_BONUS_REQ
} from './utils/upper-section';

const SPIN_DURATION = 1250;

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
    const { dice, rollPhase, scores, yahtzeeBonusCount, hideBoardValues } = this.state;

    const board = (!hideBoardValues && rollPhase > 0) ? this._board() : null

    console.log(this._totalScore());

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
            <div key={i} onClick={this.diceClick.bind(this, i)}>
              <Dice value={die.value}
                    lastRolled={die.lastRolled}
                    animate={!!die.lastRolled}
                    locked={this._isDieLocked(i)}
                    blank={rollPhase === 0}
                    clickable={this._areDiceClickable()} />
            </div>
          ))}
        </div>
        <button onClick={this.rollClick.bind(this)} disabled={this._shouldDisableRollButton()}>Roll</button>
      </div>
    );
  }

  diceClick(index) {
    if (!this._areDiceClickable()) return;

    this.setState({
      lockedBits: this.state.lockedBits ^ (1 << index)
    });
  }

  rollClick(e) {
    if (this.state.rollPhase === 3) return;
    if (this._areAllLocked()) return;

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
      rollPhase: this.state.rollPhase + 1,
      hideBoardValues: true
    });

    if (this._spinTimeout) clearTimeout(this._spinTimeout);
    this._spinTimeout = setTimeout(() => {
      this._spinTimeout = null;
      this.setState({ hideBoardValues: false });
    }, SPIN_DURATION);
  }

  selectBox(boxId, values) {
    if (this.state.rollPhase === 0) return;
    if (boxId in this.state.scores) return

    const newScore = {};
    newScore[boxId] = values[boxId];

    this.setState({
      scores: Object.assign({}, this.state.scores, newScore),
      yahtzeeBonusCount: this.state.yahtzeeBonusCount + (this._isYahtzeeBonus() ? 1 : 0),
      rollPhase: 0,
      lockedBits: 0
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

  _shouldDisableRollButton() {
    return this._areAllLocked() || this.rollPhase === 3;
  }

  _areDiceClickable() {
    return [1, 2].includes(this.state.rollPhase);
  }

  _totalScore() {
    const subtotal = upperSectionSum(this.state.scores);
    const bonus = subtotal >= UPPER_SECTION_BONUS_REQ ? UPPER_SECTION_BONUS : 0
    return sum(values(this.state.scores)) + this.state.yahtzeeBonusCount * 100 + bonus;
  }
}

export default YahtzeeGame;
