import seedrandom from 'seedrandom'

export const dev = process.env.NODE_ENV === 'development'
export const random = seedrandom(dev ? 'devseed347378' : null)

export function sampleKeys(arr, size) {
  return [...arr.keys()]
    .map(i => [random(), i])
    .sort()
    .map(n => n[1])
    .slice(0, size)
    .sort((a, b) => a - b) // Preserve original order.
}