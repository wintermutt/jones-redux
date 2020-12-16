import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { buildings } from './static.yaml'
import reduce, { buy, boughtProduct } from './players'
import { notEnoughCash } from './actions'

const mockStore = configureStore([thunk])
const mockStoreWithPlayer = (p) => mockStore({
  economy: {reading: 3},
  players: {current: 0, all: [{...p, position: 5}]}
})

describe('players/thunks', () => {
  describe('buy', () => {
    test('boughtProduct', () => {
      const product = {...buildings[5].products[0], price: 82}
      const {dispatch, getActions} = mockStoreWithPlayer({cash: product.price})

      dispatch(buy(product.name))
      expect(getActions()).toEqual([boughtProduct(product)])
    })
    test('notEnoughCash', () => {
      const {dispatch, getActions} = mockStoreWithPlayer({cash: 0})

      dispatch(buy('Cola'))
      expect(getActions()).toEqual([notEnoughCash()])
    })
  })
})

describe('players/reducers', () => {
  test('boughtProduct', () => {
    const {all: [player]} = reduce(
      {current: 0, all: [{cash: 100, hungry: true}]},
      boughtProduct({price: 10, feeds: true})
    )

    expect(player.cash).toEqual(90)
    expect(player.hungry).toEqual(false)
  })
})