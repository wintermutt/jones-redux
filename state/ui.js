import { createSlice } from '@reduxjs/toolkit'
import { isPlayerInside } from './players'
import {
  turnStarted,
  weekendProcessed,
  starved,
  movedTo,
  leftBuilding,
  notEnoughTime,
  notEnoughCash,
  gotJob,
  rejectedForJob
} from './actions'

const initialState = {
  context: null,
  bubble: null,
  weekend: null,
  notices: []
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
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
      ui.weekend = null
    },

    topNoticeDismissed(ui) {
      ui.notices.shift()
    }
  },
  extraReducers: {
    [turnStarted](ui) {
      ui.weekend = null
    },

    [weekendProcessed](ui, {payload}) {
      const {spent} = payload
      const text = "You tried to drive to Hawaii to watch a surfing contest."
      ui.weekend = {spent, text}
    },

    [starved](ui) {
      ui.notices.push('LESS TIME!\nDUE TO HUNGER')
    },

    [movedTo](ui, {payload}) {
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
    }
  }
})

export function getContext(state) {
  const inside = isPlayerInside(state)
  return state.ui.context || (inside ? {name: 'buildingMain'} : {name: 'board'})
}

export const getBubbleText = ({ui}) => ui.bubble
export const getWeekend = ({ui}) => ui.weekend
export const getTopNotice = ({ui}) => ui.notices[0]

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

export const dismissTopNotice = () => (dispatch) => {
  const {topNoticeDismissed} = uiSlice.actions
  dispatch(topNoticeDismissed())
}

export default uiSlice.reducer