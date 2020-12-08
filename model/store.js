import { configureStore } from '@reduxjs/toolkit'
import gameSlice from './slice'
import uiSlice from './ui'

export default configureStore({
  reducer: {
    game: gameSlice.reducer,
    ui: uiSlice.reducer
  },
  devTools: true,
})