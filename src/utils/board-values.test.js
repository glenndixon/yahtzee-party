import { tripsValue, quadsValue } from './board-values';

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
