export default function getPosition(size, i) {
  let [top, left, bottom, right] = Array(4).fill('unset')

  if (i < 4) {
    top = 0
    left = `${size * i}%`
  } else if (i < 8) {
    right = 0
    top = `${size * (i - 4)}%`
  } else if (i < 12) {
    bottom = 0
    right = `${size * (i - 8)}%`
  } else {
    left = 0
    bottom = `${size * (i - 12)}%`
  }

  return {top, left, bottom, right}
}