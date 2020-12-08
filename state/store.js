import { configureStore } from '@reduxjs/toolkit'
import game from './game'
import ui from './ui'

export default configureStore({
  reducer: {game, ui},
  devTools: true,
})