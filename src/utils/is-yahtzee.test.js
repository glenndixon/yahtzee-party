import isYahtzee from './is-yahtzee';
import rankFrequency from './rank-frequency';

it('works with a board (array)', () => {
  expect(isYahtzee([1,2,3,4,5])).toBe(false);
  expect(isYahtzee([1,1,3,4,5])).toBe(false);
  expect(isYahtzee([1,2,4,4,2])).toBe(false);
  expect(isYahtzee([1,1,1,1,1])).toBe(true);
});

it('works with a freqHash', () => {
  expect(isYahtzee(rankFrequency([1,2,3,4,5]))).toBe(false);
  expect(isYahtzee(rankFrequency([1,1,3,4,5]))).toBe(false);
  expect(isYahtzee(rankFrequency([1,2,4,4,2]))).toBe(false);
  expect(isYahtzee(rankFrequency([1,1,1,1,1]))).toBe(true);
});
