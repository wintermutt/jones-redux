import { createSlice } from '@reduxjs/toolkit'

function getDistance(from, to, length) {
  const internally = Math.abs(from - to)
  return Math.min(length - internally, internally)
}

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
    position: 2,
    inside: false
  },
  reducers: {
    moveTo(state, action) {
      const destination = action.payload
      if (state.position == destination) return // Can't move to current position.

      const destinationSpace = state.spaces[destination]
      if (destinationSpace.name == '') return // Can't move to empty lots.

      const distance = getDistance(state.position, destination, state.spaces.length)
      if (state.timeLeft < distance) return // Can't move with no time left.

      state.timeLeft -= distance
      state.position = destination
      state.inside = true
    },
    
    exit(state, action) {
      state.inside = false
    }
  }
})