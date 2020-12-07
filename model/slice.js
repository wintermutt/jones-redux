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
    movedTo(game, {payload}) {
      const {destination, timeSpent} = payload

      game.timeLeft -= timeSpent
      game.position = destination
      game.inside = true
    
      const building = getCurrentBuilding({game})
      game.ui.bubble = building.welcome || `Welcome to the ${building.name}!`    
    },

    selectedContext(game, {payload}) {
      game.ui.context = payload
    },
    
    worked(state, {payload}) {
      const {earnings, timeSpent} = payload
      const player = getCurrentPlayer({game: state})
      
      player.cash += earnings
      state.timeLeft -= timeSpent
    },

    boughtProduct(game, action) {
      const product = action.payload
      const player = getCurrentPlayer({game})
      
      player.cash -= product.price
    },

    enrolled(game, action) {
      const player = getCurrentPlayer({game})
      const cost = action.payload

      player.cash -= cost
      player.enrollments++
    },

    back(state) {
      const context = getContext({game: state})
      if (context && context.name === 'employerJobs') {
        state.ui.context = null
      }
    },

    notEnoughTime({ui}) {
      ui.bubble = "No time left."
    },

    notEnoughCash({ui}) {
      ui.bubble = "You do not have enough cash."
    },
    
    appliedForJob(game) {
      const {timeLeft} = game
      game.timeLeft -= Math.min(timeLeft, 4)
    },
    
    gotJob(game, action) {
      const player = getCurrentPlayer({game})
      player.job = action.payload
      game.ui.bubble = 'Congratulations,\nyou got the job!'
    },
    
    rejectedForJob({ui}) {
      ui.bubble = "Sorry. You didn't get the job due to:\n\nNot enough education."
    },

    leftBuilding(game) {
      game.inside = false
      game.ui.context = null
      game.ui.bubble = null    
    },
    
    turnEnded(game) {
      const {currentPlayer, players} = game

      game.week++
    
      const nextPlayer = currentPlayer + 1
      game.currentPlayer = nextPlayer === players.length ? 0 : nextPlayer
    
      game.timeLeft = 60
      game.position = 2
      game.inside = false
    
      game.economyReading += (rng() < 0.5 ? 1 : -1)
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

export const moveTo = (destination) => (dispatch, getState) => {
  const state = getState()
  const {buildings, inside, position, timeLeft} = state.game
  const {movedTo, leftBuilding, turnEnded} = gameSlice.actions

  const building = buildings[destination]

  if (building.name === '') return // Can't move to empty lots.

  if (inside) dispatch(leftBuilding())

  const distance = getDistance(position, destination, buildings.length)
  const timeToMove = distance * 0.625 // 10 / 16, source: https://jonesinthefastlane.fandom.com/wiki/Locations

  if (timeLeft < timeToMove) {
    dispatch(turnEnded())
    return
  }

  const timeToEnter = Math.min(timeLeft, 2)
  const timeSpent = timeToMove + timeToEnter

  dispatch(movedTo({destination, timeSpent}))
}

export const selectContext = (context) => (dispatch, getState) => {
  const {selectedContext} = gameSlice.actions
  dispatch(selectedContext(context))
}

export const applyForJob = (jobName) => (dispatch, getState) => {
  const state = getState()
  const {jobs, timeLeft, economyReading, ui} = state.game
  const {notEnoughTime, appliedForJob, gotJob, rejectedForJob} = gameSlice.actions

  const {employer} = ui.context
  const jobDefinition = jobs[employer].find(j => j.name === jobName)
  const wage = getCurrentPrice(jobDefinition.wage, economyReading)
  const job = {name: jobName, employer, wage}

  if (timeLeft < 1) {
    dispatch(notEnoughTime())
    return
  }

  dispatch(appliedForJob(job))
  rng() < 0.5 ? dispatch(gotJob(job)) : dispatch(rejectedForJob(job))
}

export const enroll = () => (dispatch, getState) => {
  const state = getState()
  const {economyReading} = state.game
  const player = getCurrentPlayer(state)
  const building = getCurrentBuilding(state)
  const {notEnoughCash, enrolled} = gameSlice.actions

  const cost = getCurrentPrice(building.enrollment, economyReading)

  player.cash < cost ? dispatch(notEnoughCash()) : dispatch(enrolled(cost))
}

export const buy = (productName) => (dispatch, getState) => {
  const state = getState()
  const {economyReading} = state.game
  const {notEnoughCash, boughtProduct} = gameSlice.actions

  const player = getCurrentPlayer(state)
  const building = getCurrentBuilding(state)
  const productDefinition = building.products.find(p => p.name === productName)
  const price = getCurrentPrice(productDefinition.price, economyReading)
  const product = {...productDefinition, name: productName, price}

  player.cash < price ? dispatch(notEnoughCash()) : dispatch(boughtProduct(product))
}

export const work = () => (dispatch, getState) => {
  const state = getState()
  const {timeLeft} = state.game
  const player = getCurrentPlayer(state)
  const {notEnoughTime, worked} = gameSlice.actions

  if (timeLeft === 0) {
    dispatch(notEnoughTime())
    return
  }

  const timeSpent = Math.min(timeLeft, 6)
  const earnings = player.job.wage * timeSpent * 1.3333333333333333

  dispatch(worked({earnings, timeSpent}))
}

export const leaveBuilding = () => (dispatch, getState) => {
  const {game} = getState()
  const {leftBuilding, turnEnded} = gameSlice.actions
  
  dispatch(leftBuilding())
  if (game.timeLeft === 0) dispatch(turnEnded())
}

export const endTurn = () => (dispatch) => {
  const {turnEnded} = game.actions
  dispatch(turnEnded())
}

export default gameSlice