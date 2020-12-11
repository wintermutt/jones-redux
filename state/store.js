import { configureStore } from '@reduxjs/toolkit'
import game from './game'
import ui from './ui'
import players from './players'
import economy from './economy'
import buildings from './buildings'

export default configureStore({
  reducer: {game, ui, players, economy, buildings},
  devTools: true,
})