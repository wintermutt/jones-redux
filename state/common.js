import seedrandom from 'seedrandom'

export const dev = process.env.NODE_ENV === 'development'
export const random = seedrandom(dev ? 'devseed347378' : null)