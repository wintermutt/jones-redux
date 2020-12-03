import { createSlice } from '@reduxjs/toolkit'
import seedrandom from 'seedrandom'
import spaces from './spaces'
import jobs from './jobs'

const dev = process.env.NODE_ENV === 'development'

const {rng, seed} = seedrandom(dev ? 'devseed347378' : null, {
  pass: (rng, seed) => ({rng, seed})
})

function getNewPlayer() {
  return {cash: 200, job: null, enrollments: 0}
}

function getCurrentPlayer({players, currentPlayer}) {
  return players[currentPlayer]
}

function getCurrentBuilding({spaces, position}) {
  return spaces[position]
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
  const {timeLeft, economyReading} = state

  const building = getCurrentBuilding(state)
  const player = getCurrentPlayer(state)

  state.timeLeft -= Math.min(timeLeft, 2)
  state.inside = true

  state.ui.bubble = building.welcome || `Welcome to the ${building.name}!`

  if (player.job && player.job.employer === building.name) {
    state.ui.buttons.push({
      label: 'Work', action: 'work'
    })
  }

  if (building.enrollment) {
    state.ui.buttons.push({
      label: 'Enroll',
      action: 'enroll',
      payload: getCurrentPrice(building.enrollment, economyReading)
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
  const {currentPlayer, players} = state

  state.week++

  const nextPlayer = currentPlayer + 1
  state.currentPlayer = nextPlayer === players.length ? 0 : nextPlayer

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
      const {spaces, inside, position, timeLeft} = state

      const destination = action.payload
      const destinationSpace = spaces[destination]

      if (destinationSpace.name === '') return // Can't move to empty lots.

      if (inside) exit(state)

      const distance = getDistance(position, destination, spaces.length)
      const timeRequired = distance * 0.625 // 10 / 16, source: https://jonesinthefastlane.fandom.com/wiki/Locations

      if (timeLeft < timeRequired) {
        endTurn(state)
        return // Can't move with no time left.
      }

      state.timeLeft -= timeRequired
      state.position = destination

      enterCurrentBuilding(state)
    },

    listEmployers(state) {
      listEmployers(state)
    },

    listJobs(state, action) {
      const {jobs, economyReading} = state

      const {employer} = action.payload

      state.ui.menu = jobs[employer].map(job => {
        const currentWage = getCurrentPrice(job.wage, economyReading)

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
      const {timeLeft} = state

      const job = action.payload

      const player = getCurrentPlayer(state)

      if (timeLeft < 1) {
        state.ui.bubble = "Sorry, we're closing."
        return
      }

      state.timeLeft -= Math.min(timeLeft, 4)

      if (rng() < 0.5) {
        player.job = job
        state.ui.bubble = 'Congratulations,\nyou got the job!'
      } else {
        state.ui.bubble = "Sorry. You didn't get the job due to:\n\nNot enough education."
      }
    },
    
    work(state) {
      const {timeLeft} = state

      if (timeLeft === 0) return

      const hoursWorked = Math.min(timeLeft, 6)

      const player = getCurrentPlayer(state)
      player.cash += player.job.wage * hoursWorked * 1.3333333333333333

      state.timeLeft -= hoursWorked
    },

    buy(state, action) {
      const {economyReading} = state

      const product = action.payload
      const player = getCurrentPlayer(state)
      const price = getCurrentPrice(product.price, economyReading)

      if (player.cash < price) return
      
      player.cash -= price
    },

    enroll(state, action) {
      const cost = action.payload
      const player = getCurrentPlayer(state)

      if (player.cash < cost) return

      player.cash -= cost
      player.enrollments++
    },

    exit(state) {
      exit(state)
      if (state.timeLeft === 0) endTurn(state)
    }
  }
})