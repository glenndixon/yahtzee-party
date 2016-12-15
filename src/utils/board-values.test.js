import {
  tripsValue,
  quadsValue,
  smStraightValue,
  lgStraightValue,
  fullHouseValue,
  chanceValue,
  yahtzeeValue } from './board-values';

describe('tripsValue', () => {
  it('works', () => {
    expect(tripsValue([1,2,3,4,5])).toEqual(0);
    expect(tripsValue([1,1,3,4,5])).toEqual(0);
    expect(tripsValue([1,2,4,4,2])).toEqual(0);

    expect(tripsValue([1,1,1,2,3])).toEqual(8);
    expect(tripsValue([4,5,4,4,4])).toEqual(21);
    expect(tripsValue([6,6,6,6,6])).toEqual(30);
  });
});

describe('quadsValue', () => {
  it('works', () => {
    expect(quadsValue([1,2,3,4,5])).toEqual(0);
    expect(quadsValue([1,1,3,4,5])).toEqual(0);
    expect(quadsValue([1,2,4,4,2])).toEqual(0);
    expect(quadsValue([1,1,1,2,3])).toEqual(0);

    expect(quadsValue([4,5,4,4,4])).toEqual(21);
    expect(quadsValue([6,6,6,6,6])).toEqual(30);
  });
});

describe('smStraightValue', () => {
  it('works', () => {
    expect(smStraightValue([1,1,3,4,5], {})).toEqual(0);
    expect(smStraightValue([1,2,4,4,2], {})).toEqual(0);
    expect(smStraightValue([1,1,1,2,3], {})).toEqual(0);

    expect(smStraightValue([1,2,3,4,5], {})).toEqual(30);
    expect(smStraightValue([4,3,2,1,1], {})).toEqual(30);
    expect(smStraightValue([6,5,2,3,4], {})).toEqual(30);

    expect(smStraightValue([5,5,5,5,5], {})).toEqual(0);
    expect(smStraightValue([5,5,5,5,5], {
      BOX_YAHTZEE: 50
    })).toEqual(0);
    expect(smStraightValue([5,5,5,5,5], {
      BOX_FIVES: 15
    })).toEqual(0);
    expect(smStraightValue([5,5,5,5,5], {
      BOX_FIVES: 15,
      BOX_YAHTZEE: 50
    })).toEqual(30);
  });
});

describe('lgStraightValue', () => {
  it('works', () => {
    expect(lgStraightValue([1,1,3,4,5], {})).toEqual(0);
    expect(lgStraightValue([1,2,4,4,2], {})).toEqual(0);
    expect(lgStraightValue([1,1,1,2,3], {})).toEqual(0);

    expect(lgStraightValue([1,2,3,4,5], {})).toEqual(40);
    expect(lgStraightValue([4,3,2,1,1], {})).toEqual(0);
    expect(lgStraightValue([6,5,2,3,4], {})).toEqual(40);

    expect(lgStraightValue([5,5,5,5,5], {})).toEqual(0);
    expect(lgStraightValue([5,5,5,5,5], {
      BOX_YAHTZEE: 50
    })).toEqual(0);
    expect(lgStraightValue([5,5,5,5,5], {
      BOX_FIVES: 15
    })).toEqual(0);
    expect(lgStraightValue([5,5,5,5,5], {
      BOX_FIVES: 15,
      BOX_YAHTZEE: 50
    })).toEqual(40);
  });
});

describe('yahtzeeValue', () => {
  it('works', () => {
    expect(yahtzeeValue([1,1,3,4,5])).toEqual(0);
    expect(yahtzeeValue([1,2,4,4,2])).toEqual(0);
    expect(yahtzeeValue([1,1,1,1,1])).toEqual(50);
    expect(yahtzeeValue([6,6,6,6,6])).toEqual(50);
  });
});
