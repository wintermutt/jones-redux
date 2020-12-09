import { buildings } from './static.yaml'
import { random } from './common'
import { getCurrentPrice } from './economy'
import {
  notEnoughTime,
  appliedForJob,
  gotJob,
  rejectedForJob
} from './actions'

export function getEmployers() {
  const employers = buildings
    .filter(b => b.jobs !== undefined)
    .map(b => b.name)

  return employers.slice(1).concat(employers.slice(0, 1))
}

export function getEmployerJobs({economy}, employer) {
  if (!employer) return null
  const building = buildings.find(b => b.name === employer) 

  return building.jobs.map(job => ({
    name: job.name,
    wage: getCurrentPrice({economy}, job.wage)
  }))
}

export const applyForJob = (jobName) => (dispatch, getState) => {
  const {game, ui, economy} = getState()

  const {employer} = ui.context
  const building = buildings.find(b => b.name === employer) 

  const jobDefinition = building.jobs.find(j => j.name === jobName)
  const wage = getCurrentPrice({economy}, jobDefinition.wage)
  const job = {name: jobName, employer, wage}

  if (game.timeLeft < 1) {
    dispatch(notEnoughTime())
    return
  }

  dispatch(appliedForJob(job))
  random() < 0.5 ? dispatch(gotJob(job)) : dispatch(rejectedForJob(job))
}