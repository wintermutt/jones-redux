import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import reduce, { buy, boughtProduct } from './players'
import { notEnoughCash } from './actions'

const mockStore = configureStore([thunk])

describe('players/thunks', () => {
  test('buy', () => {
    const {dispatch, getActions} = mockStore({
      economy: {reading: 3},
      players: {current: 0, all: [{position: 5, cash: 0}]}
    })

    dispatch(buy('Cola'))
    expect(getActions()).toEqual([notEnoughCash()])
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