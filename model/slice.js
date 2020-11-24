import { createSlice } from '@reduxjs/toolkit'

export default createSlice({
  name: 'game',
  initialState: {
    spaces: Array(16).fill(null),
    counter: 0
  },
  reducers: {
    increment(state) {
      state.counter++
    }
  }
})