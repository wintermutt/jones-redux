import { jobs } from './data.yaml'
import { random } from './common'
import { getCurrentPrice } from './economy'
import {
  notEnoughTime,
  appliedForJob,
  gotJob,
  rejectedForJob
} from './actions'

export function getEmployers() {
  return Object.keys(jobs)
}

export function getEmployerJobs({economy}, employer) {
  if (!employer) return null

  return jobs[employer].map(job => ({
    name: job.name,
    wage: getCurrentPrice({economy}, job.wage)
  }))
}

export const applyForJob = (jobName) => (dispatch, getState) => {
  const {game, ui, economy} = getState()

  const {employer} = ui.context
  const jobDefinition = jobs[employer].find(j => j.name === jobName)
  const wage = getCurrentPrice({economy}, jobDefinition.wage)
  const job = {name: jobName, employer, wage}

  if (game.timeLeft < 1) {
    dispatch(notEnoughTime())
    return
  }

  dispatch(appliedForJob(job))
  random() < 0.5 ? dispatch(gotJob(job)) : dispatch(rejectedForJob(job))
}