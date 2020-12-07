import { createSlice } from '@reduxjs/toolkit'
import seedrandom from 'seedrandom'
import buildings from './buildings'
import jobs from './jobs'

const dev = process.env.NODE_ENV === 'development'

const {rng, seed} = seedrandom(dev ? 'devseed347378' : null, {
  pass: (rng, seed) => ({rng, seed})
})

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    buildings,
    jobs,
    players: Array(2).fill(null).map(i => getNewPlayer()),
    currentPlayer: 0,
    week: 1,
    timeLeft: 60,
    position: 2,
    inside: false,
    economyReading: 3,
    ui: {
      context: null,
      bubble: null
    }
  },
  reducers: {
    moveTo(state, action) {
      const {buildings, inside, position, timeLeft} = state

      const destination = action.payload
      const building = buildings[destination]

      if (building.name === '') return // Can't move to empty lots.

      if (inside) exit(state)

      const distance = getDistance(position, destination, buildings.length)
      const timeRequired = distance * 0.625 // 10 / 16, source: https://jonesinthefastlane.fandom.com/wiki/Locations

      if (timeLeft < timeRequired) {
        endTurn(state)
        return // Can't move with no time left.
      }

      state.timeLeft -= timeRequired
      state.position = destination

      state.timeLeft -= Math.min(state.timeLeft, 2)
      state.inside = true
    
      state.ui.bubble = building.welcome || `Welcome to the ${building.name}!`    
    },

    goToEmployerJobs(state, action) {
      state.ui.context = {name: 'employerJobs', employer: action.payload}
    },
    
    work(state) {
      const {timeLeft} = state

      if (timeLeft === 0) return

      const hoursWorked = Math.min(timeLeft, 6)

      const player = getCurrentPlayer({game: state})
      player.cash += player.job.wage * hoursWorked * 1.3333333333333333

      state.timeLeft -= hoursWorked
    },

    buy(state, action) {
      const {economyReading} = state
      const productName = action.payload

      const player = getCurrentPlayer({game: state})
      const building = getCurrentBuilding({game: state})
      const product = building.products.find(p => p.name === productName)
      const price = getCurrentPrice(product.price, economyReading)

      if (player.cash < price) return
      
      player.cash -= price
    },

    enroll(state) {
      const player = getCurrentPlayer({game: state})
      const building = getCurrentBuilding({game: state})

      const cost = getCurrentPrice(building.enrollment, state.economyReading)

      if (player.cash < cost) return

      player.cash -= cost
      player.enrollments++
    },

    exit(state) {
      exit(state)
      if (state.timeLeft === 0) endTurn(state)
    },

    back(state) {
      const context = getContext({game: state})
      if (context && context.name === 'employerJobs') {
        state.ui.context = null
      }
    },

    noTimeLeft({ui}) {
      ui.bubble = "Sorry, we're closing."
    },
    
    appliedForJob(game) {
      const {timeLeft} = game
      game.timeLeft -= Math.min(timeLeft, 4)
    },
    
    gotJob(game, action) {
      const {economyReading} = game
      const player = getCurrentPlayer({game})
      const {job, employer} = action.payload
      const wage = getCurrentPrice(job.wage, economyReading)

      player.job = {...job, employer, wage}
      game.ui.bubble = 'Congratulations,\nyou got the job!'
    },
    
    rejectedForJob({ui}) {
      ui.bubble = "Sorry. You didn't get the job due to:\n\nNot enough education."
    }
  }
})

function getNewPlayer() {
  return {cash: 200, job: null, enrollments: 0}
}

function getCurrentPrice(basePrice, reading) {
  // Source: https://jonesinthefastlane.fandom.com/wiki/Economy#Item_Prices
  return basePrice + Math.floor((basePrice * reading) / 60)
}

function getDistance(from, to, length) {
  const internally = Math.abs(from - to)
  return Math.min(length - internally, internally)
}

function exit(state) {
  state.inside = false
  state.ui.context = null
  state.ui.bubble = null
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

export function getContext({game}) {
  return game.ui.context || (game.inside ? {name: 'buildingMain'} : {name: 'board'})
}

export function getCurrentPlayer({game}) {
  const {players, currentPlayer} = game
  return players[currentPlayer]
}

export function getCurrentBuilding({game}) {
  const {buildings, position} = game
  return buildings[position]
}

export function canEnrollHere(state) {
  const building = getCurrentBuilding(state)
  return building.enrollment !== undefined
}

export function canWorkHere(state) {
  const player = getCurrentPlayer(state)
  const building = getCurrentBuilding(state)
  return player.job && player.job.employer === building.name
}

export function getLocalProducts(state) {
  const {economyReading} = state.game
  const building = getCurrentBuilding(state)

  if (building.products === undefined) return null
  
  return building.products.map(p => ({
    name: p.name,
    price: getCurrentPrice(p.price, economyReading)
  }))
}

export function getEmployers(state) {
  return Object.keys(state.game.jobs)
}

export function getEmployerJobs(state, employer) {
  const {economyReading} = state.game

  if (!employer) return null

  return state.game.jobs[employer].map(job => ({
    name: job.name,
    wage: getCurrentPrice(job.wage, economyReading)
  }))
}

export const applyForJob = (jobName) => (dispatch, getState) => {
  const state = getState()
  const {jobs, timeLeft, ui} = state.game
  const {noTimeLeft, appliedForJob, gotJob, rejectedForJob} = gameSlice.actions

  const {employer} = ui.context
  const job = jobs[employer].find(j => j.name === jobName)
  const payload = {job, employer}

  if (timeLeft < 1) {
    dispatch(noTimeLeft())
    return
  }

  dispatch(appliedForJob(payload))
  rng() < 0.5 ? dispatch(gotJob(payload)) : dispatch(rejectedForJob(payload))
}

export default gameSlice