import store from './store'
import { newTurn } from './actions'
import { getCurrentPlayer, moveTo, buy } from './players'
import { getLocalProducts } from './buildings'

test('buy', () => {
  store.dispatch(newTurn())
  
  let player = getCurrentPlayer(store.getState())
  const initialCash = player.cash

  store.dispatch(moveTo(5))
  
  const localProducts = getLocalProducts(store.getState())
  const product = localProducts[0]

  store.dispatch(buy(product.name))

  player = getCurrentPlayer(store.getState())
  expect(player.cash).toBe(initialCash - product.price)
})