import rankFrequency from './rank-frequency';
import values from './values';

export default function isYahtzee(freqHash) {
  if (freqHash instanceof Array) {
    freqHash = rankFrequency(freqHash);
  }

  return values(freqHash)[0] === 5;
}
