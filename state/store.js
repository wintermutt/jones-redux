import { configureStore } from '@reduxjs/toolkit'
import ui from './ui'
import players from './players'
import economy from './economy'

export default configureStore({
  reducer: {ui, players, economy},
  devTools: true,
})