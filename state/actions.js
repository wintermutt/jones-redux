// Define cross-module actions here to avoid circular imports.
// https://redux-toolkit.js.org/usage/usage-guide#exporting-and-using-slices
import { createAction } from '@reduxjs/toolkit'

export const turnStarted = createAction('turnStarted')
export const turnEnded = createAction('turnEnded')

export const weekendProcessed = createAction('weekendProcessed')
export const starved = createAction('starved')
export const didntStarve = createAction('didntStarve')

export const movedTo = createAction('movedTo')
export const leftBuilding = createAction('leftBuilding')

export const notEnoughTime = createAction('notEnoughTime')
export const notEnoughCash = createAction('notEnoughCash')

export const appliedForJob = createAction('appliedForJob')
export const gotJob = createAction('gotJob')
export const rejectedForJob = createAction('rejectedForJob')