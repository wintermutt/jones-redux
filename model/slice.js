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
    inside: false,
    jobs: {
      'Discount Store': [
        {name: 'Clerk', wage: 4},
        {name: 'Assistant Manager', wage: 7},
        {name: 'Manager', wage: 8}
      ],
      'Burger Joint': [
        {name: 'Cook', wage: 4},
        {name: 'Clerk', wage: 6},
        {name: 'Assistant Manager', wage: 7},
        {name: 'Manager', wage: 8}
      ],
      'Clothing Store': [
        {name: 'Salesperson', wage: 8},
        {name: 'Assistant Manager', wage: 10},
        {name: 'Manager', wage: 14}
      ],
      'Appliance Store': [
        {name: 'Salesperson', wage: 6},
        {name: 'Electronics Repair', wage: 4},
        {name: 'Manager', wage: 16}
      ],
      'University': [
        {name: 'Janitor', wage: 4},
        {name: 'Teacher', wage: 13},
        {name: 'Professor', wage: 24}
      ],
      'Factory': [
        {name: 'Janitor', wage: 8},
        {name: 'Assembly Worker', wage: 9},
        {name: 'Secretary', wage: 10},
        {name: "Machinist's Helper", wage: 12},
        {name: 'Executive Secretary', wage: 21},
        {name: 'Machinist', wage: 22},
        {name: 'Department Manager', wage: 26},
        {name: 'Engineer', wage: 27},
        {name: 'General Manager', wage: 30}
      ],
      'Bank': [
        {name: 'Janitor', wage: 7},
        {name: 'Teller', wage: 12},
        {name: 'Assistant Manager', wage: 16},
        {name: 'Manager', wage: 22},
        {name: 'Investment Broker', wage: 26}
      ],
      'Grocery Store': [
        {name: 'Janitor', wage: 6},
        {name: 'Checker', wage: 9},
        {name: 'Butcher', wage: 14},
        {name: 'Assistant Manager', wage: 18},
        {name: 'Manager', wage: 21}
      ],
      'Rent Office': [
        {name: 'Groundskeeper', wage: 7},
        {name: 'Apartment Manager', wage: 9}
      ]
    },
    menu: []
  },
  reducers: {
    moveTo(state, action) {
      const destination = action.payload
      if (state.position === destination) return // Can't move to current position.

      const destinationSpace = state.spaces[destination]
      if (destinationSpace.name === '') return // Can't move to empty lots.

      const distance = getDistance(state.position, destination, state.spaces.length)
      if (state.timeLeft < distance) return // Can't move with no time left.

      state.timeLeft -= distance
      state.position = destination
      state.inside = true

      if (state.spaces[state.position].name === 'Employment Office') {
        state.menu = Object.keys(state.jobs).map(k => k)
      } else {
        state.menu = []
      }
    },
    
    exit(state, action) {
      state.inside = false
      state.menu = []
    }
  }
})