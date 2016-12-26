import sum from './sum';

export const UPPER_SECTION_BOX_IDS = [
  'BOX_ONES',
  'BOX_TWOS',
  'BOX_THREES',
  'BOX_FOURS',
  'BOX_FIVES',
  'BOX_SIXES'
];

export function upperSectionSum(scores) {
  return sum(UPPER_SECTION_BOX_IDS.map(id => scores[id] || 0));
}

export const UPPER_SECTION_BONUS = 35;
export const UPPER_SECTION_BONUS_REQ = 63;
