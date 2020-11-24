import { configureStore } from '@reduxjs/toolkit'
import gameSlice from './slice'

export default configureStore({
  reducer: {
    game: gameSlice.reducer
  },
  devTools: true,
})