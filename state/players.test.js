import store from './store'
import { reset } from './actions'
import { startGame } from './game'
import { getPlayer, moveTo, buy } from './players'
import { getLocalProducts } from './buildings'

const {dispatch, getState} = store

beforeEach(() => {
  dispatch(reset())
  dispatch(startGame())
})

test('buy', () => {
  let player = getPlayer(getState())
  const initialCash = player.cash

  dispatch(moveTo(5))
  
  const localProducts = getLocalProducts(getState())
  const product = localProducts[0]

  dispatch(buy(product.name))

  player = getPlayer(getState())
  expect(player.cash).toBe(initialCash - product.price)
})