import rankFrequency from './rank-frequency';
import containsFrequency from './contains-frequency';

const SM_STRAIGHT_VALUE = 25;
const LG_STRAIGHT_VALUE = 30;
const FULL_HOUSE_VALUE = 40;
const YAHTZEE_VALUE = 50;

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

export { tripsValue as tripsValue };
export { quadsValue as quadsValue };

const SMALL_STRAIGHTS = [
  [1, 2, 3, 4],
  [2, 3, 4, 5],
  [3, 4, 5, 6]
];

export function smStraightValue(board, hasYahtzeed, scores) {
  const isSmStraight = SMALL_STRAIGHTS.some(function(straight) {
    return straight.every(function(item) {
      return board.includes(item);
    });
  });

  if (isSmStraight) return 25;
}

export function lgStraightValue(board, hasYahtzeed, scores) {

}

export function fullHouseValue(board, hasYahtzeed, scores) {
  const freqHash = rankFrequency(board);
}
