import { createSlice } from '@reduxjs/toolkit'
import { timeCosts } from './static.yaml'
import { endTurn } from './game'
import { getCurrentPrice } from './economy'
import { getBuildingAt, getCurrentBuilding, getDistance, isEmptyLot } from './buildings'
import {
  turnStarted,
  turnEnded,
  movedTo,
  leftBuilding,
  notEnoughTime,
  notEnoughCash,
  appliedForJob,
  gotJob,
  starved
} from './actions'

const playersSlice = createSlice({
  name: 'players',
  initialState: {
    all: Array(2).fill(null).map(i => getNewPlayer()),
    current: 0
  },
  reducers: {
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

      processWeekend(player)
      processStarvation(player)
    },

    [turnEnded](players) {
      const {current, all} = players

      const nextPlayer = current + 1
      players.current = nextPlayer === all.length ? 0 : nextPlayer
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
    weekend: null,
    cash: 200,
    job: null,
    enrollments: 0,
    hungry: true,
    notices: []
  }
}

const getCurrent = ({all, current}) => all[current]

function processWeekend(player) {
  if (player.week === 1) return
  
  const spent = 10
  player.cash -= spent
  player.weekend = {
    text: "You tried to drive to Hawaii to watch a surfing contest.",
    spent
  }
}

function processStarvation(player) {
  if (player.week === 1 || !player.hungry)
    player.hungry = true
  else {
    player.timeLeft -= timeCosts.starvation
    player.notices.push('LESS TIME!\nDUE TO HUNGER')
  }
}

export const getCurrentPlayer = ({players}) => getCurrent(players)
export const getCurrentPlayerNumber = ({players}) => players.current + 1
export const getCurrentPlayerPosition = state => getCurrentPlayer(state).position
export const getCurrentPlayerWeekend = state => getCurrentPlayer(state).weekend
export const getCurrentPlayerNotices = state => getCurrentPlayer(state).notices
export const isCurrentPlayerInside = state => getCurrentPlayer(state).inside

export const moveTo = (destination) => (dispatch, getState) => {
  const state = getState()
  const player = getCurrentPlayer(state)
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
  const player = getCurrentPlayer(state)
  const building = getCurrentBuilding(state)
  const {enrolled} = playersSlice.actions

  const cost = getCurrentPrice(state, building.enrollment)

  player.cash < cost ? dispatch(notEnoughCash()) : dispatch(enrolled(cost))
}

export const buy = (productName) => (dispatch, getState) => {
  const state = getState()
  const player = getCurrentPlayer(state)
  const building = getCurrentBuilding(state)
  const {boughtProduct} = playersSlice.actions

  const productDefinition = building.products.find(p => p.name === productName)
  const price = getCurrentPrice(state, productDefinition.price)
  const product = {...productDefinition, name: productName, price}

  player.cash < price ? dispatch(notEnoughCash()) : dispatch(boughtProduct(product))
}

export const work = () => (dispatch, getState) => {
  const state = getState()
  const player = getCurrentPlayer(state)
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

export const leaveBuilding = () => (dispatch, getState) => {
  const state = getState()
  const player = getCurrentPlayer(state)
  
  dispatch(leftBuilding())
  if (player.timeLeft === 0) dispatch(endTurn())
}

export default playersSlice.reducer