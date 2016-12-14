export default function rankFrequency(board) {
  return board.reduce(function(hash, item) {
    hash[item] = (hash[item] || 0) + 1;
    return hash;
  }, {});
}
