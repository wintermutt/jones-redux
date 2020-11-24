import { createSlice } from '@reduxjs/toolkit'

export default createSlice({
  name: 'game',
  initialState: {
    spaces: [
      {name: 'Luxury Condo'},
      {name: 'Rent Office'},
      {name: 'Low-Cost Housing'},
      {name: 'Pawn Shop'},
      {name: 'Discount Store'},
      {name: 'Burger Joint'},
      {name: 'Clothing Store'},
      {name: ''},
      {name: 'Appliance Store'},
      {name: 'University'},
      {name: ''},
      {name: 'Employment Office'},
      {name: 'Factory'},
      {name: 'Bank'},
      {name: 'Grocery Store'},
      {name: ''}
    ],
    players: [
      {cash: 400},
      {cash: 400}
    ],
    currentPlayer: 0,
    week: 0,
    timeLeft: 60,
    position: 2
  },
  reducers: {
    moveTo(state, action) {
      const destination = action.payload
      state.position = destination
    }
  }
})