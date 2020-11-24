import { createSlice } from '@reduxjs/toolkit'

export default createSlice({
  name: 'game',
  initialState: {
    counter: 0
  },
  reducers: {
    increment(state) {
      state.counter++
    }
  }
})