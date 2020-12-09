import { createSlice } from '@reduxjs/toolkit'
import { getCurrentPrice } from './economy'
import { getBuildingAt, getCurrentBuilding, getDistance, isEmptyLot } from './buildings'
import {
  movedTo,
  leftBuilding,
  notEnoughTime,
  notEnoughCash,
  appliedForJob,
  gotJob,
  turnEnded
} from './actions'

const gameSlice = createSlice({
  name: 'game',
  initialState: {
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

export function getCurrentPlayer({game}) {
  const {players, currentPlayer} = game
  return players[currentPlayer]
}

export const moveTo = (destination) => (dispatch, getState) => {
  const state = getState()
  const {inside, position, timeLeft} = state.game

  if (isEmptyLot(position)) return
  
  const building = getBuildingAt(destination)

  if (inside) dispatch(leftBuilding())

  const distance = getDistance(position, destination)
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