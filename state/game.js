import { createSlice } from '@reduxjs/toolkit'
import { getCurrentPrice } from './economy'
import {
  movedTo,
  leftBuilding,
  notEnoughTime,
  notEnoughCash,
  appliedForJob,
  gotJob,
  turnEnded
} from './actions'

import { buildings } from './data.yaml'

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    buildings,
    players: Array(2).fill(null).map(i => getNewPlayer()),
    currentPlayer: 0,
    week: 1,
    timeLeft: 60,
    position: 2,
    inside: false
  },
  reducers: {
    worked(game, {payload}) {
      const {earnings, timeSpent} = payload
      const player = getCurrentPlayer({game})
      
      player.cash += earnings
      game.timeLeft -= timeSpent
    },

    boughtProduct(game, {payload}) {
      const product = payload
      const player = getCurrentPlayer({game})
      
      player.cash -= product.price
    },

    enrolled(game, {payload}) {
      const player = getCurrentPlayer({game})
      const cost = payload

      player.cash -= cost
      player.enrollments++
    }    
  },
  extraReducers: {    
    [movedTo](game, {payload}) {
      const {destination, timeSpent} = payload

      game.timeLeft -= timeSpent
      game.position = destination
      game.inside = true    
    },

    [leftBuilding](game) {
      game.inside = false
    },    

    [appliedForJob](game) {
      const {timeLeft} = game
      game.timeLeft -= Math.min(timeLeft, 4)
    },

    [gotJob](game, {payload}) {
      const player = getCurrentPlayer({game})
      const job = payload

      player.job = job
    },

    [turnEnded](game) {
      const {currentPlayer, players} = game

      game.week++
    
      const nextPlayer = currentPlayer + 1
      game.currentPlayer = nextPlayer === players.length ? 0 : nextPlayer
    
      game.timeLeft = 60
      game.position = 2
      game.inside = false    
    }
  }
})

function getNewPlayer() {
  return {cash: 200, job: null, enrollments: 0}
}

function getDistance(from, to, length) {
  const internally = Math.abs(from - to)
  return Math.min(length - internally, internally)
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
  const building = getCurrentBuilding(state)

  if (building.products === undefined) return null
  
  return building.products.map(p => ({
    name: p.name,
    price: getCurrentPrice(state, p.price)
  }))
}

export const moveTo = (destination) => (dispatch, getState) => {
  const state = getState()
  const {buildings, inside, position, timeLeft} = state.game

  const building = buildings[destination]

  if (building.name === '') return // Can't move to empty lots.

  if (inside) dispatch(leftBuilding())

  const distance = getDistance(position, destination, buildings.length)
  const timeToMove = distance * 0.625 // 10 / 16, source: https://jonesinthefastlane.fandom.com/wiki/Locations

  if (timeLeft < timeToMove) {
    dispatch(turnEnded())
    return
  }

  const timeToEnter = Math.min(timeLeft - timeToMove, 2)
  const timeSpent = timeToMove + timeToEnter

  dispatch(movedTo({destination, building, timeSpent}))
}

export const enroll = () => (dispatch, getState) => {
  const state = getState()
  const player = getCurrentPlayer(state)
  const building = getCurrentBuilding(state)
  const {enrolled} = gameSlice.actions

  const cost = getCurrentPrice(state, building.enrollment)

  player.cash < cost ? dispatch(notEnoughCash()) : dispatch(enrolled(cost))
}

export const buy = (productName) => (dispatch, getState) => {
  const state = getState()
  const {boughtProduct} = gameSlice.actions

  const player = getCurrentPlayer(state)
  const building = getCurrentBuilding(state)
  const productDefinition = building.products.find(p => p.name === productName)
  const price = getCurrentPrice(state, productDefinition.price)
  const product = {...productDefinition, name: productName, price}

  player.cash < price ? dispatch(notEnoughCash()) : dispatch(boughtProduct(product))
}

export const work = () => (dispatch, getState) => {
  const state = getState()
  const {timeLeft} = state.game
  const player = getCurrentPlayer(state)
  const {worked} = gameSlice.actions

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
  
  dispatch(leftBuilding())
  if (game.timeLeft === 0) dispatch(turnEnded())
}

export const endTurn = () => (dispatch) => {
  dispatch(turnEnded())
}

export default gameSlice.reducer