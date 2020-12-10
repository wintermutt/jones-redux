import { configureStore } from '@reduxjs/toolkit'
import ui from './ui'
import players from './players'
import economy from './economy'
import buildings from './buildings'

export default configureStore({
  reducer: {ui, players, economy, buildings},
  devTools: true,
})