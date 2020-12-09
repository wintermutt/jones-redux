import { configureStore } from '@reduxjs/toolkit'
import game from './game'
import ui from './ui'
import economy from './economy'

export default configureStore({
  reducer: {game, ui, economy},
  devTools: true,
})