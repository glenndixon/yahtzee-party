import rankFrequency from './rank-frequency';
import containsFrequency from './contains-frequency';
import values from './values';
import isYahtzee from './is-yahtzee';
import sum from './sum';
import { UPPER_SECTION_BOX_IDS } from './upper-section';

const FULL_HOUSE_VALUE = 25;
const SM_STRAIGHT_VALUE = 30;
const LG_STRAIGHT_VALUE = 40;
const YAHTZEE_VALUE = 50;

function upperSectionValue(value, board) {
  return sum(board.filter(function(item) {
    return item === value;
  }));
}

const [onesValue, twosValue, threesValue, foursValue, fivesValue, sixesValue] = [1, 2, 3, 4, 5, 6].map(function(rank) {
  return function(board) {
    return upperSectionValue(rank, board);
  }
});
export { onesValue, twosValue, threesValue, foursValue, fivesValue, sixesValue };


const [tripsValue, quadsValue] = [3, 4].map(function(freq) {
  return function (board) {
    const freqs = rankFrequency(board);
    if (containsFrequency(freqs, freq)) {
      return sum(board);
    }
    return 0;
  }
});

export { tripsValue, quadsValue };

const SMALL_STRAIGHTS = [
  [1, 2, 3, 4],
  [2, 3, 4, 5],
  [3, 4, 5, 6]
];

const LARGE_STRAIGHTS = [
  [1, 2, 3, 4, 5],
  [2, 3, 4, 5, 6]
];

function straightValuerFactory(straights, value) {
  return function(board, scores) {
    const isStraight = straights.some(function(straight) {
      return straight.every(function(item) {
        return board.includes(item);
      });
    });

    if (isStraight) return value;
    if (scores.BOX_YAHTZEE && isYahtzee(board) && scores[UPPER_SECTION_BOX_IDS[board[0] - 1]]) return value;

    return 0;
  }
}

export const smStraightValue = straightValuerFactory(SMALL_STRAIGHTS, SM_STRAIGHT_VALUE);
export const lgStraightValue = straightValuerFactory(LARGE_STRAIGHTS, LG_STRAIGHT_VALUE);

export function fullHouseValue(board, scores) {
  const freqHash = rankFrequency(board);
  if (values(freqHash).sort().toString() === '2,3') return FULL_HOUSE_VALUE;
  if (scores.BOX_YAHTZEE && isYahtzee(board) && scores[UPPER_SECTION_BOX_IDS[board[0] - 1]]) return FULL_HOUSE_VALUE;
  return 0;
}

export const chanceValue = sum;

export function yahtzeeValue(board) {
  return isYahtzee(board) ? YAHTZEE_VALUE : 0;
}

export function mapValues(board, scores) {
  return {
    BOX_ONES: onesValue(board),
    BOX_TWOS: twosValue(board),
    BOX_THREES: threesValue(board),
    BOX_FOURS: foursValue(board),
    BOX_FIVES: fivesValue(board),
    BOX_SIXES: sixesValue(board),
    BOX_TRIPS: tripsValue(board),
    BOX_QUADS: quadsValue(board),
    BOX_SM_STRAIGHT: smStraightValue(board, scores),
    BOX_LG_STRAIGHT: lgStraightValue(board, scores),
    BOX_FULL_HOUSE: fullHouseValue(board, scores),
    BOX_CHANCE: chanceValue(board),
    BOX_YAHTZEE: yahtzeeValue(board)
  }
}
