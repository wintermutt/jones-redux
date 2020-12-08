import { createSlice } from '@reduxjs/toolkit'
import gameSlice, {
  notEnoughTime,
  notEnoughCash,
  rejectedForJob,
} from './game'

const {movedTo, gotJob, leftBuilding} = gameSlice.actions

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    context: null,
    bubble: null
  },
  reducers: {
    contextSelected(ui, {payload}) {
      ui.context = payload
    },

    wentBack(ui) {
      const {context} = ui

      if (context && context.name === 'employerJobs') {
        ui.context = null
      }
    }
  },
  extraReducers: {
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

export function getContext({game, ui}) {
  return ui.context || (game.inside ? {name: 'buildingMain'} : {name: 'board'})
}

export function getBubbleText({ui}) {
  return ui.bubble
}

export const selectContext = (context) => (dispatch) => {
  const {contextSelected} = uiSlice.actions
  dispatch(contextSelected(context))
}

export const goBack = () => (dispatch) => {
  const {wentBack} = uiSlice.actions
  dispatch(wentBack())
}

export default uiSlice