import React, { Component } from 'react';
import Box from './Box';
import { mapValues } from './utils/board-values';
import './Boxes.css';
import isYahtzee from './utils/is-yahtzee';

// 123456SB
// 34FSLCYB
//   Dice
//   Total

class Boxes extends Component {
  render() {
    const { board, scores, yahtzeeBonusCount } = this.props;

    const boardValue = board ? mapValues(board, scores) : null;
    const isBoardYahtzeeBonus = board && isYahtzee(board) && scores.BOX_YAHTZEE;

    return (
      <div className="Boxes">
        <div className="Boxes__row">
          <Box label="Aces" />
          <Box label="Twos" />
          <Box label="Threes" />
          <Box label="Fours" />
          <Box label="Fives" />
          <Box label="Sixes" />
          <Box label="Bonus">
            Subtotal = 35
          </Box>
        </div>
        <div className="Boxes__row">
          <Box label="Trips" />
          <Box label="Quads" />
          <Box label="Full House" />
          <Box label="Sm. Str." />
          <Box label="Lg. Str." />
          <Box label="Chance" />
          <Box label="Yahtzee">
            {[...Array(yahtzeeBonusCount)].map((_, i) => <span key={i}>&#9733; </span>)}

            {isBoardYahtzeeBonus ? <span className="g-blink">&#9733;</span> : null}
          </Box>
        </div>
      </div>
    );
  }
}

export default Boxes;
