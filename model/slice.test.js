import store from './store'
import slice from './slice'

test('buy', () => {
  const price = 10

  let {players, currentPlayer} = store.getState().game
  let player = players[currentPlayer]
  const initialCash = player.cash

  store.dispatch(slice.actions.buy({price}))

  ;({players, currentPlayer} = store.getState().game)
  player = players[currentPlayer]
  expect(player.cash).toBe(initialCash - price)
})