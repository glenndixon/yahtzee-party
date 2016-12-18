import rankFrequency from './rank-frequency';
import containsFrequency from './contains-frequency';
import values from './values';
import isYahtzee from './is-yahtzee';

const FULL_HOUSE_VALUE = 25;
const SM_STRAIGHT_VALUE = 30;
const LG_STRAIGHT_VALUE = 40;
const YAHTZEE_VALUE = 50;

const RANK_TO_UPPER_SECTION_ID = [
  null,
  'BOX_ONES',
  'BOX_TWOS',
  'BOX_THREES',
  'BOX_FOURS',
  'BOX_FIVES',
  'BOX_SIXES',
];

function sum(arr) {
  return arr.reduce(function(s, item) {
    return s + item;
  }, 0);
}

function upperSectionValue(value, board) {
  return sum(board.filter(function(item) {
    return item === value;
  }));
}

export function onesValue(board) {
  return upperSectionValue(1, board);
}

export function twosValue(board) {
  return upperSectionValue(2, board);
}

export function threesValue(board) {
  return upperSectionValue(3, board);
}

export function foursValue(board) {
  return upperSectionValue(4, board);
}

export function fivesValue(board) {
  return upperSectionValue(5, board);
}

export function sixesValue(board) {
  return upperSectionValue(6, board);
}


const [tripsValue, quadsValue] = [3, 4].map(function(freq) {
  return function (board) {
    const freqs = rankFrequency(board);
    if (containsFrequency(freqs, freq)) {
      return sum(board);
    }
    return 0;
  }
});

export { tripsValue, quadsValue }

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
    if (scores.BOX_YAHTZEE && isYahtzee(board) && scores[RANK_TO_UPPER_SECTION_ID[board[0]]]) return value;

    return 0;
  }
}

export const smStraightValue = straightValuerFactory(SMALL_STRAIGHTS, SM_STRAIGHT_VALUE);
export const lgStraightValue = straightValuerFactory(LARGE_STRAIGHTS, LG_STRAIGHT_VALUE);

export function fullHouseValue(board, scores) {
  const freqHash = rankFrequency(board);
  if (values(freqHash).sort().toString() === '2,3') return FULL_HOUSE_VALUE;
  if (scores.BOX_YAHTZEE && isYahtzee(board) && scores[RANK_TO_UPPER_SECTION_ID[board[0]]]) return FULL_HOUSE_VALUE;
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
