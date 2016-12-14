export default function values(obj) {
  return Object.keys(obj).map(k => obj[k]);
}
