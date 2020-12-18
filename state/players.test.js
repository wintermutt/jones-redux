import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { buildings } from './static.yaml'
import reduce, { buy, boughtProduct, work, worked } from './players'
import { notEnoughTime, notEnoughCash } from './actions'

const mockStore = configureStore([thunk])
const testStore = (player) => mockStore({
  economy: {reading: 3},
  players: {current: 0, all: [{...player, position: 5}]}
})

describe('players/thunks', () => {
  describe('buy', () => {
    test('boughtProduct', () => {
      const product = {...buildings[5].products[0], price: 82}
      const {dispatch, getActions} = testStore({cash: product.price})

      dispatch(buy(product.name))
      expect(getActions()).toEqual([boughtProduct(product)])
    })

    test('notEnoughCash', () => {
      const {dispatch, getActions} = testStore({cash: 0})

      dispatch(buy('Cola'))
      expect(getActions()).toEqual([notEnoughCash()])
    })
  })

  describe('work', () => {
    const job = {employer: "Mr. Ronald's", name: 'Cook', wage: 5}

    test('worked', () => {
      const {dispatch, getActions} = testStore({job, timeLeft: 60})

      dispatch(work())
      expect(getActions()).toEqual([worked({earnings: 40, timeSpent: 6})])
    })

    test('notEnoughTime', () => {
      const {dispatch, getActions} = testStore({job, timeLeft: 0})

      dispatch(work())
      expect(getActions()).toEqual([notEnoughTime()])
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

  test('worked', () => {
    const {all: [player]} = reduce(
      {current: 0, all: [{cash: 0, timeLeft: 60}]},
      worked({earnings: 40, timeSpent: 6})
    )

    expect(player.cash).toEqual(40)
    expect(player.timeLeft).toEqual(54)
  })
})