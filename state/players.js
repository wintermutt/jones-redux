import { createSlice } from '@reduxjs/toolkit'
import { timeCosts } from './static.yaml'
import { endTurn } from './game'
import { getCurrentPrice } from './economy'
import { getBuildingAt, getCurrentBuilding, getDistance, isEmptyLot } from './buildings'
import {
  turnStarted,
  turnEnded,
  weekendProcessed,
  starved,
  didntStarve,
  movedTo,
  leftBuilding,
  notEnoughTime,
  notEnoughCash,
  appliedForJob,
  gotJob
} from './actions'

const playersSlice = createSlice({
  name: 'players',
  initialState: {
    all: Array(2).fill(null).map(i => getNewPlayer()),
    current: 0
  },
  reducers: {
    relaxed(players) {
      const player = getCurrent(players)

      player.timeLeft -= Math.min(player.timeLeft, timeCosts.relax)
    },

    worked(players, {payload}) {
      const {earnings, timeSpent} = payload
      const player = getCurrent(players)
      
      player.cash += earnings
      player.timeLeft -= timeSpent
    },

    boughtProduct(players, {payload}) {
      const product = payload
      const player = getCurrent(players)
      
      player.cash -= product.price

      if (product.feeds) player.hungry = false
    },

    enrolled(players, {payload}) {
      const player = getCurrent(players)
      const cost = payload

      player.cash -= cost
      player.enrollments++
    }
  },
  extraReducers: {
    [turnStarted](players) {
      const player = getCurrent(players)

      player.week++
      player.timeLeft = 60
      player.position = 2
      player.inside = false
    },

    [turnEnded](players) {
      const {current, all} = players

      const nextPlayer = current + 1
      players.current = nextPlayer === all.length ? 0 : nextPlayer
    },

    [weekendProcessed](players, {payload}) {
      const player = getCurrent(players)
      const {spent} = payload

      player.cash -= spent
    },

    [starved](players) {
      const player = getCurrent(players)

      player.timeLeft -= timeCosts.starvation
    },

    [didntStarve](players) {
      const player = getCurrent(players)

      player.hungry = true
    },

    [movedTo](players, {payload}) {
      const {destination, timeSpent} = payload
      const player = getCurrent(players)

      player.timeLeft -= timeSpent
      player.position = destination
      player.inside = true    
    },

    [leftBuilding](players) {
      const player = getCurrent(players)

      player.inside = false
    },

    [appliedForJob](players) {
      const player = getCurrent(players)
      const {timeLeft} = player
      
      player.timeLeft -= Math.min(timeLeft, timeCosts.jobApplication)
    },

    [gotJob](players, {payload}) {
      const job = payload
      const player = getCurrent(players)

      player.job = job
    }
  }
})

function getNewPlayer() {
  return {
    week: 0,
    timeLeft: null,
    position: null,
    inside: null,
    cash: 200,
    job: null,
    home: {name: 'Low-Cost Housing'},
    enrollments: 0,
    hungry: true,
    notices: []
  }
}

const getCurrent = ({all, current}) => all[current]

export const getPlayer = ({players}) => getCurrent(players)
export const getPlayerNumber = ({players}) => players.current + 1
export const getPlayerPosition = state => getPlayer(state).position
export const isPlayerInside = state => getPlayer(state).inside

export const moveTo = (destination) => (dispatch, getState) => {
  const state = getState()
  const player = getPlayer(state)
  const {inside, position, timeLeft} = player

  if (isEmptyLot(destination)) return
  
  const building = getBuildingAt(destination)

  if (inside) dispatch(leftBuilding())

  const distance = getDistance(position, destination)
  const timeToMove = distance * timeCosts.movement

  if (timeLeft < timeToMove) {
    dispatch(endTurn())
    return
  }

  const timeToEnter = Math.min(timeLeft - timeToMove, timeCosts.enteringBuilding)
  const timeSpent = timeToMove + timeToEnter

  dispatch(movedTo({destination, building, timeSpent}))
}

export const enroll = () => (dispatch, getState) => {
  const state = getState()
  const player = getPlayer(state)
  const building = getCurrentBuilding(state)
  const {enrolled} = playersSlice.actions

  const cost = getCurrentPrice(state, building.enrollment)

  dispatch(player.cash < cost ? notEnoughCash() : enrolled(cost))
}

export const buy = (productName) => (dispatch, getState) => {
  const state = getState()
  const player = getPlayer(state)
  const building = getCurrentBuilding(state)
  const {boughtProduct} = playersSlice.actions

  const productDefinition = building.products.find(p => p.name === productName)
  const price = getCurrentPrice(state, productDefinition.price)
  const product = {...productDefinition, name: productName, price}

  dispatch(player.cash < price ? notEnoughCash() : boughtProduct(product))
}

export const work = () => (dispatch, getState) => {
  const state = getState()
  const player = getPlayer(state)
  const {timeLeft} = player
  const {worked} = playersSlice.actions

  if (timeLeft === 0) {
    dispatch(notEnoughTime())
    return
  }

  const timeSpent = Math.min(timeLeft, timeCosts.work)
  const earnings = player.job.wage * timeSpent * 1.3333333333333333

  dispatch(worked({earnings, timeSpent}))
}

export const relax = () => (dispatch, getState) => {
  const {relaxed} = playersSlice.actions

  dispatch(relaxed())
}

export const leaveBuilding = () => (dispatch, getState) => {
  const state = getState()
  const player = getPlayer(state)
  
  dispatch(leftBuilding())
  if (player.timeLeft === 0) dispatch(endTurn())
}

export default playersSlice.reducer