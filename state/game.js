import { createSlice } from '@reduxjs/toolkit'
import { turnEnded, turnStarted } from './actions'

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

export const startGame = () => (dispatch) => {
  const {finishedLoading} = gameSlice.actions
  dispatch(turnStarted())
  dispatch(finishedLoading())
}

export const endTurn = () => (dispatch) => {
  dispatch(turnEnded())
  dispatch(turnStarted())
}

export default gameSlice.reducer