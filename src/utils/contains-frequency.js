export default function containsFrequency(freqHash, count) {
  for (let k in freqHash) {
    if (freqHash[k] >= count) return true;
  }
  return false;
}
