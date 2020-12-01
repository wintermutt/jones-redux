import { createSlice } from '@reduxjs/toolkit'
import seedrandom from 'seedrandom'
import spaces from './spaces'
import jobs from './jobs'

const dev = process.env.NODE_ENV === 'development'

const {rng, seed} = seedrandom(dev ? 'devseed347378' : null, {
  pass: (rng, seed) => ({rng, seed})
})

function getNewPlayer() {
  return {cash: 200, job: null}
}

function getCurrentPlayer(state) {
  return state.players[state.currentPlayer]
}

function getCurrentPrice(basePrice, reading) {
  // Source: https://jonesinthefastlane.fandom.com/wiki/Economy#Item_Prices
  return basePrice + Math.floor((basePrice * reading) / 60)
}

function getDistance(from, to, length) {
  const internally = Math.abs(from - to)
  return Math.min(length - internally, internally)
}

function enterCurrentBuilding(state) {
  const building = state.spaces[state.position]
  const player = getCurrentPlayer(state)

  if (state.timeLeft < 1) return // Can't enter with no time left.

  state.timeLeft -= 1
  state.inside = true

  state.ui.bubble = building.welcome || `Welcome to the ${building.name}!`

  if (player.job && player.job.employer === building.name) {
    state.ui.buttons.push({
      label: 'Work', action: 'work'
    })
  }

  state.ui.menu = []

  if (building.products) {
    state.ui.menu = building.products.map(p => ({
      label: p.name,
      amount: getCurrentPrice(p.price, state.economyReading),
      action: 'buy',
      payload: p
    }))
  }

  if (building.name === 'Employment Office') {
    listEmployers(state)
  }
}

function exit(state) {
  state.inside = false
  state.ui.menu = []
  state.ui.buttons = []
  state.ui.bubble = null
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
    economyReading: 0,
    ui: {
      menu: [],
      buttons: [],
      bubble: null
    }
  },
  reducers: {
    moveTo(state, action) {
      if (state.inside) exit(state)

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

      state.ui.menu = state.jobs[employer].map(job => {
        const currentWage = getCurrentPrice(job.wage, state.economyReading)

        return {
          label: job.name,
          amount: currentWage,
          action: 'applyForJob',
          payload: {...job, wage: currentWage, employer}
        }
      })

      state.ui.buttons = [{label: 'Back', action: 'listEmployers'}]
    },

    applyForJob(state, action) {
      const job = action.payload

      const player = getCurrentPlayer(state)

      if (state.timeLeft < 1) {
        state.ui.bubble = "Sorry, we're closing."
        return
      }

      state.timeLeft -= 1

      if (rng() < 0.5) {
        player.job = job
        state.ui.bubble = 'Congratulations,\nyou got the job!'
      } else {
        state.ui.bubble = "Sorry. You didn't get the job due to:\n\nNot enough education."
      }
    },
    
    work(state) {
      if (state.timeLeft < 10) return

      state.timeLeft -= 10
      const player = getCurrentPlayer(state)
      player.cash += player.job.wage
    },

    buy(state, action) {
      const product = action.payload
      const player = getCurrentPlayer(state)
      const price = getCurrentPrice(product.price, state.economyReading)

      if (player.cash < price) return
      
      player.cash -= price
    },

    exit(state) {
      exit(state)
    }
  }
})