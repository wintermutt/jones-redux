import { createSlice } from '@reduxjs/toolkit'
import spaces from './spaces'
import jobs from './jobs'

function getNewPlayer() {
  return {cash: 200}
}

function getDistance(from, to, length) {
  const internally = Math.abs(from - to)
  return Math.min(length - internally, internally)
}

export default createSlice({
  name: 'game',
  initialState: {
    spaces,
    jobs,
    players: Array(2).fill(null).map(i => getNewPlayer()),
    currentPlayer: 0,
    week: 0,
    timeLeft: 60,
    position: 2,
    inside: false,
    menu: []
  },
  reducers: {
    moveTo(state, action) {
      const destination = action.payload
      if (state.position === destination) return // Can't move to current position.

      const destinationSpace = state.spaces[destination]
      if (destinationSpace.name === '') return // Can't move to empty lots.

      const distance = getDistance(state.position, destination, state.spaces.length)
      if (state.timeLeft < distance) return // Can't move with no time left.

      state.timeLeft -= distance
      state.position = destination
      state.inside = true

      if (state.spaces[state.position].name === 'Employment Office') {
        state.menu = Object.keys(state.jobs).map(k => {
            return {
              label: k,
              action: 'listEmployerJobs',
              payload: {employer: k}
            }
          }
        )
      } else {
        state.menu = []
      }
    },

    listEmployerJobs(state, action) {
      const {employer} = action.payload
      state.menu = state.jobs[employer].map(job => {
        return {
          label: `${job.name}: $${job.wage}`,
          action: 'applyForJob',
          payload: {employer, job: job.name}
        }
      })
    },

    applyForJob(state, action) {
      const {employer, job} = action.payload
      console.log('Applied for job:', employer, job)
    },
    
    exit(state, action) {
      state.inside = false
      state.menu = []
    }
  }
})