import { createSlice } from '@reduxjs/toolkit'
import { isPlayerInside } from './players'
import {
  movedTo,
  leftBuilding,
  notEnoughTime,
  notEnoughCash,
  gotJob,
  rejectedForJob,
  turnStarted
} from './actions'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    context: null,
    bubble: null,
    weekendDismissed: null
  },
  reducers: {
    contextChanged(ui, {payload}) {
      ui.context = payload
    },

    wentBack(ui) {
      const {context} = ui

      if (context && context.name === 'employerJobs') {
        ui.context = null
      }
    },

    weekendDismissed(ui) {
      ui.weekendDismissed = true
    }
  },
  extraReducers: {
    [movedTo](ui, {payload}) {
      ui.weekendDismissed = true
      
      const {building} = payload
      ui.bubble = building.welcome || `Welcome to the ${building.name}!`
    },

    [leftBuilding](ui) {
      ui.context = null
      ui.bubble = null
    },

    [gotJob](ui) {
      ui.bubble = 'Congratulations,\nyou got the job!'
    },

    [notEnoughTime](ui) {
      ui.bubble = "No time left."
    },

    [notEnoughCash](ui) {
      ui.bubble = "You do not have enough cash."
    },

    [rejectedForJob](ui) {
      ui.bubble = "Sorry. You didn't get the job due to:\n\nNot enough education."
    },

    [turnStarted](ui) {
      ui.weekendDismissed = false
    }
  }
})

export function getContext(state) {
  const inside = isPlayerInside(state)
  return state.ui.context || (inside ? {name: 'buildingMain'} : {name: 'board'})
}

export const getBubbleText = ({ui}) => ui.bubble
export const isWeekendDismissed = ({ui}) => ui.weekendDismissed

export const changeContext = (context) => (dispatch) => {
  const {contextChanged} = uiSlice.actions
  dispatch(contextChanged(context))
}

export const goBack = () => (dispatch) => {
  const {wentBack} = uiSlice.actions
  dispatch(wentBack())
}

export const dismissWeekend = () => (dispatch) => {
  const {weekendDismissed} = uiSlice.actions
  dispatch(weekendDismissed())
}

export default uiSlice.reducer