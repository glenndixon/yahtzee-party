import React, { Component } from 'react';
import Box from './Box';
import { mapValues } from './utils/board-values';
import './Boxes.css';
import isYahtzee from './utils/is-yahtzee';
import classnames from 'classnames';
import {
  upperSectionSum,
  UPPER_SECTION_BONUS,
  UPPER_SECTION_BONUS_REQ
} from './utils/upper-section';

// this should match the dice spin animation length in Dice.css
const SPIN_ANIMATION_LENGTH = 1250;

class Boxes extends Component {
  render() {
    const { board, scores, yahtzeeBonusCount } = this.props;

    const boardValue = board ? mapValues(board, scores) : {};
    const isBoardYahtzeeBonus = board && isYahtzee(board) && scores.BOX_YAHTZEE;
    const subtotal = upperSectionSum(scores);

    const drawBox = (boxId, label, children) => {
      let value = null;
      if (boxId in scores) {
        value = scores[boxId];
      } else if (boardValue[boxId]) {
        value = (<span>{boardValue[boxId]}</span>);
      } else if (subtotal >= UPPER_SECTION_BONUS_REQ && boxId ==='BONUS') {
        value = UPPER_SECTION_BONUS;
      }
      const isFilled = boxId in scores;
      const isFillable = board && !isFilled && boxId != 'BONUS';
      const onClick = isFillable ? this.selectBox.bind(this, boxId, boardValue) : null;

      const clsName = classnames('Box', {
        'Box--filled': isFilled,
        'Box--fillable': isFillable,
        'Box--dark': boxId ==='BONUS'
      });

      return (
        <div className={clsName} onClick={onClick}>
          <div className="Box__label">{label}</div>
          <div className="Box__value">
            {value}
          </div>
          <div className="Box__secondary">
            {children || null}
          </div>
        </div>
      )
    }

    return (
      <div className="Boxes">
        <div className="Boxes__row">
          {drawBox('BOX_ONES', "Aces")}
          {drawBox('BOX_TWOS', "Twos")}
          {drawBox('BOX_THREES', "Threes")}
          {drawBox('BOX_FOURS', "Fours")}
          {drawBox('BOX_FIVES', "Fives")}
          {drawBox('BOX_SIXES', "Sixes")}
          {drawBox('BONUS', "Bonus", (
            <div>Subtotal: {subtotal}</div>
          ))}
        </div>
        <div className="Boxes__row">
          {drawBox('BOX_TRIPS', "Trips")}
          {drawBox('BOX_QUADS', "Quads")}
          {drawBox('BOX_FULL_HOUSE', "Full House")}
          {drawBox('BOX_SM_STRAIGHT', "Sm. Str.")}
          {drawBox('BOX_LG_STRAIGHT', "Lg. Str.")}
          {drawBox('BOX_CHANCE', "Chance")}
          {drawBox('BOX_YAHTZEE', "Yahtzee", (
            <div>
              {[...Array(yahtzeeBonusCount)].map((_, i) => <span key={i}>&#9733; </span>)}

              {isBoardYahtzeeBonus ? <span className="g-blink">&#9733;</span> : null}
            </div>
          ))}
        </div>
      </div>
    );
  }

  selectBox(boxId, boardValue) {
    if (!boardValue) return;
    if (boxId in this.props.scores) return;

    this.props.selectBox(boxId, boardValue);
  }
}

export default Boxes;
