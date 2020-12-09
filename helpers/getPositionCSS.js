export default function getPositionCSS(width, height, i) {
  let [top, left, bottom, right] = Array(4).fill('unset')

  if (i < 4) {
    top = 0
    left = `${width * i}vw`
  } else if (i < 8) {
    right = 0
    top = `${height * (i - 4)}vh`
  } else if (i < 12) {
    bottom = 0
    right = `${width * (i - 8)}vw`
  } else {
    left = 0
    bottom = `${height * (i - 12)}vh`
  }

  return {top, left, bottom, right}
}