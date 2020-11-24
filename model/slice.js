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
    counter: 0
  },
  reducers: {
    increment(state) {
      state.counter++
    }
  }
})