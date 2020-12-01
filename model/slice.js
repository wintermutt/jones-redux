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

  state.timeLeft -= Math.min(state.timeLeft, 2)
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

function endTurn(state) {
  state.week++

  const nextPlayer = state.currentPlayer + 1
  state.currentPlayer = nextPlayer === state.players.length ? 0 : nextPlayer

  state.timeLeft = 60
  state.position = 2
  state.inside = false

  state.economyReading += (rng() < 0.5 ? 1 : -1)
}

export default createSlice({
  name: 'game',
  initialState: {
    spaces,
    jobs,
    players: Array(2).fill(null).map(i => getNewPlayer()),
    currentPlayer: 0,
    week: 1,
    timeLeft: 60,
    position: 2,
    inside: false,
    economyReading: 3,
    ui: {
      menu: [],
      buttons: [],
      bubble: null
    }
  },
  reducers: {
    moveTo(state, action) {
      const destination = action.payload
      const destinationSpace = state.spaces[destination]

      if (destinationSpace.name === '') return // Can't move to empty lots.

      if (state.inside) exit(state)

      const distance = getDistance(state.position, destination, state.spaces.length)
      const timeRequired = distance * 0.625 // 10 / 16, source: https://jonesinthefastlane.fandom.com/wiki/Locations

      if (state.timeLeft < timeRequired) {
        endTurn(state)
        return // Can't move with no time left.
      }

      state.timeLeft -= timeRequired
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

      state.timeLeft -= Math.min(state.timeLeft, 4)

      if (rng() < 0.5) {
        player.job = job
        state.ui.bubble = 'Congratulations,\nyou got the job!'
      } else {
        state.ui.bubble = "Sorry. You didn't get the job due to:\n\nNot enough education."
      }
    },
    
    work(state) {
      if (state.timeLeft === 0) return

      const hoursWorked = Math.min(state.timeLeft, 6)

      const player = getCurrentPlayer(state)
      player.cash += player.job.wage * hoursWorked * 1.3333333333333333

      state.timeLeft -= hoursWorked
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
      if (state.timeLeft === 0) endTurn(state)
    }
  }
})