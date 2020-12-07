import store from './store'
import { getCurrentPlayer, getLocalProducts, moveTo, buy } from './slice'

test('buy', () => {
  let player = getCurrentPlayer(store.getState())
  const initialCash = player.cash

  store.dispatch(moveTo(5))
  
  const localProducts = getLocalProducts(store.getState())
  const product = localProducts[0]

  store.dispatch(buy(product.name))

  player = getCurrentPlayer(store.getState())
  expect(player.cash).toBe(initialCash - product.price)
})