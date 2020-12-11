import { createSlice } from '@reduxjs/toolkit'
import { random } from './common'
import { turnStarted } from './actions'

const economySlice = createSlice({
  name: 'economy',
  initialState: {
    reading: 3
  },
  extraReducers: {
    [turnStarted](economy) {
      economy.reading += (random() < 0.5 ? 1 : -1)
    }
  }
})

export function getCurrentPrice({economy}, basePrice) {
  // Source: https://jonesinthefastlane.fandom.com/wiki/Economy#Item_Prices
  return basePrice + Math.floor((basePrice * economy.reading) / 60)
}

export default economySlice.reducer