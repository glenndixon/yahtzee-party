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

const INITIAL_STATE = {
  dice: [6,6,6,6,6].map(value => ({ value })),
  rollPhase: 0,
  lockedBits: 0,
  scores: {},
  yahtzeeBonusCount: 0,
  round: 0
}

class YahtzeeGame extends Component {
  constructor() {
    super();

    this.state = INITIAL_STATE;
  }

  render() {
    const { dice, rollPhase, scores, yahtzeeBonusCount, hideBoardValues } = this.state;

    const board = (!hideBoardValues && rollPhase > 0) ? this._board() : null;
    const buttonText = this.state.round === 13 ? 'Play Again' : 'Roll';

    return (
      <div className="YahtzeeGame">
        <div className="YahtzeeGame__boxes">
          <Boxes board={board}
                 scores={scores}
                 yahtzeeBonusCount={yahtzeeBonusCount}
                 hasMadeBonus={this._hasMadeBonus()}
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
                    spinId={i}
                    clickable={this._areDiceClickable()} />
            </div>
          ))}
        </div>
        <button className="YahtzeeGame__button" onClick={this.rollClick.bind(this)} disabled={this._shouldDisableRollButton()}>
          {buttonText}
        </button>
        <div className="YahtzeeGame__rolls">
          {this._rollsLeftText()}
        </div>
        <div className="YahtzeeGame__score">
          {this._scoreText()}
        </div>
      </div>
    );
  }

  componentWillMount() {
    document.addEventListener("keydown", this._keyDownHandler = (e) => {
      if (49 <= e.keyCode && e.keyCode <= 53) {
        this.diceClick(e.keyCode - 49);
      } else if (e.keyCode === 32) {
        this.rollClick();
      }
    }, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this._keyDownHandler, false);
  }

  diceClick(index) {
    if (!this._areDiceClickable()) return;

    this.setState({
      lockedBits: this.state.lockedBits ^ (1 << index)
    });
  }

  rollClick() {
    if (this._shouldDisableRollButton()) return;

    if (this.state.round === 13) {
      this.setState(INITIAL_STATE);
      return;
    }

    const dice = this.state.dice.map((die, i) => {
      if (this._isDieLocked(i)) return die;

      // update the value and lastRolled for all the non-locked dice
      return Object.assign({}, die, {
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
      lockedBits: 0,
      round: this.state.round + 1
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
    return this._areAllLocked() || this.state.rollPhase === 3 || this.state.hideBoardValues;
  }

  _areDiceClickable() {
    return [1, 2].includes(this.state.rollPhase);
  }

  _totalScore() {
    const bonus = this._hasMadeBonus() ? UPPER_SECTION_BONUS : 0
    return sum(values(this.state.scores)) + this.state.yahtzeeBonusCount * 100 + bonus;
  }

  _hasMadeBonus() {
    return upperSectionSum(this.state.scores) >= UPPER_SECTION_BONUS_REQ;
  }

  _rollsLeftText() {
    if (this.state.round === 13) return "";
    if (this.state.rollPhase === 2) return "1 roll left";
    return `${3 - this.state.rollPhase} rolls left`;
  }

  _scoreText() {
    if (this.state.round > 0) {
      return this._totalScore();
    }
  }
}

export default YahtzeeGame;
