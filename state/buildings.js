import { createSlice } from '@reduxjs/toolkit'
import { sampleKeys } from './common'
import { newTurn } from './actions'
import { buildings } from './static.yaml'
import { getCurrentPlayer } from './players'
import { getCurrentPrice } from './economy'

const buildingsSlice = createSlice({
  name: 'buildings',
  initialState: {},
  extraReducers: {
    [newTurn](state) {
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

export function getNumberOfBuildings() {
  return buildings.length
}

export function isEmptyLot(position) {
  return buildings[position].name === ''
}

export function getBuildingAt(position) {
  return buildings[position]
}

export function getCurrentBuilding(state) {
  const {position} = getCurrentPlayer(state)
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
  const player = getCurrentPlayer(state)
  const building = getCurrentBuilding(state)
  return player.job && player.job.employer === building.name
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