import { createSlice } from '@reduxjs/toolkit'
import { getPlayer } from './players'
import {
  turnEnded,
  turnStarted,
  weekendProcessed,
  starved,
  didntStarve
} from './actions'

const gameSlice = createSlice({
  name: 'game',
  initialState: {
    isLoading: true
  },
  reducers: {
    finishedLoading(game) {
      game.isLoading = false
    }
  }
})

export const isGameLoading = ({game}) => game.isLoading

export const startGame = () => (dispatch, getState) => {
  const {finishedLoading} = gameSlice.actions
  processTurn(dispatch, getState)
  dispatch(finishedLoading())
}

export const endTurn = () => (dispatch, getState) => {
  dispatch(turnEnded())
  processTurn(dispatch, getState)
}

function processTurn(dispatch, getState) {
  dispatch(turnStarted())
  processWeekend(dispatch, getState)
  processStarvation(dispatch, getState)
}

function processWeekend(dispatch, getState) {
  const state = getState()
  const player = getPlayer(state)

  if (player.week === 1) return
  
  const spent = 10
  dispatch(weekendProcessed({spent}))
}

function processStarvation(dispatch, getState) {
  const state = getState()
  const player = getPlayer(state)

  if (player.hungry && player.week > 1) dispatch(starved())
  else dispatch(didntStarve())
}

export default gameSlice.reducer