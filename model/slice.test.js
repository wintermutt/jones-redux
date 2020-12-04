import store from './store'
import slice, { getCurrentPlayer, getLocalProducts } from './slice'

test('buy', () => {
  let player = getCurrentPlayer(store.getState())
  const initialCash = player.cash

  store.dispatch(slice.actions.moveTo(5))
  
  const localProducts = getLocalProducts(store.getState())
  const product = localProducts[0]

  store.dispatch(slice.actions.buy(product.name))

  player = getCurrentPlayer(store.getState())
  expect(player.cash).toBe(initialCash - product.price)
})