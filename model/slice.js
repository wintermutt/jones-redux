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

function enterCurrentBuilding(state) {
  const building = state.spaces[state.position]

  state.timeLeft -= 1
  state.inside = true

  if (building.name === 'Employment Office') {
    listEmployers(state)
  } else {
    state.ui.menu = []
  }
}

function listEmployers(state) {
  state.ui.menu = Object.keys(state.jobs).map(k => ({
    label: k,
    action: 'listJobs',
    payload: {employer: k}
  }))

  state.ui.buttons = []
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
    ui: {
      menu: [],
      buttons: []  
    }
  },
  reducers: {
    moveTo(state, action) {
      const destination = action.payload
      const destinationSpace = state.spaces[destination]
      if (destinationSpace.name === '') return // Can't move to empty lots.

      const distance = getDistance(state.position, destination, state.spaces.length)
      if (state.timeLeft < distance) return // Can't move with no time left.

      state.timeLeft -= distance
      state.position = destination

      enterCurrentBuilding(state)
    },

    listEmployers(state, action) {
      listEmployers(state)
    },

    listJobs(state, action) {
      const {employer} = action.payload
      state.ui.menu = state.jobs[employer].map(job => ({
        label: `${job.name}: $${job.wage}`,
        action: 'applyForJob',
        payload: {employer, job: job.name}
      }))

      state.ui.buttons = [{label: 'Back', action: 'listEmployers'}]
    },

    applyForJob(state, action) {
      const {employer, job} = action.payload
      console.log('Applied for job:', employer, job)
    },
    
    exit(state, action) {
      state.inside = false
      state.ui.menu = []
    }
  }
})