import { configureStore } from '@reduxjs/toolkit'
import gameSlice from './game'
import uiSlice from './ui'

export default configureStore({
  reducer: {
    game: gameSlice.reducer,
    ui: uiSlice.reducer
  },
  devTools: true,
})