import { createSlice } from '@reduxjs/toolkit'
import { sampleKeys } from './common'
import { turnStarted } from './actions'
import { buildings } from './static.yaml'
import { getPlayer } from './players'
import { getCurrentPrice } from './economy'

const initialState = {}

const buildingsSlice = createSlice({
  name: 'buildings',
  initialState,
  extraReducers: {
    [turnStarted](state) {
      generateSamples(state)
    }
  }
})

function generateSamples(state) {
  buildings
    .filter(b => b.sampleProducts)
    .forEach(b => {
      state[b.name] = {
        sampledProducts: sampleKeys(b.products, b.sampleProducts.size)
      }
    })
}

export const getNumberOfBuildings = () => buildings.length
export const isEmptyLot = position => buildings[position].name === ''
export const getBuildingAt = position => buildings[position]

export function getCurrentBuilding(state) {
  const {position} = getPlayer(state)
  return getBuildingAt(position)
}

export function getDistance(from, to) {
  const internally = Math.abs(from - to)
  return Math.min(buildings.length - internally, internally)
}

export function canEnrollHere(state) {
  const building = getCurrentBuilding(state)
  return building.enrollment !== undefined
}

export function canWorkHere(state) {
  const player = getPlayer(state)
  const building = getCurrentBuilding(state)
  return player.job && player.job.employer === building.name
}

export function canRelaxHere(state) {
  const player = getPlayer(state)
  const building = getCurrentBuilding(state)
  return building.name === player.home.name
}

export function getLocalProducts(state) {
  const building = getCurrentBuilding(state)

  if (building.products === undefined) return null

  let products = building.products
  
  const buildingState = state.buildings[building.name]
  if (buildingState && buildingState.sampledProducts) {
    products = buildingState.sampledProducts.map(i => building.products[i])
  }
  
  return products.map(p => ({
    name: p.name,
    price: getCurrentPrice(state, p.price)
  }))
}

export default buildingsSlice.reducer