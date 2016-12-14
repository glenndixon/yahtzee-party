import rankFrequency from './rank-frequency';

export default function isYahtzee(board) {
  return rankFrequency(board)[0] === 5;
}
