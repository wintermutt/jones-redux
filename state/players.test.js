import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { buildings } from './static.yaml'
import reduce, {
  buy, boughtProduct,
  enroll, enrolled,
  relax, relaxed,
  work, worked
} from './players'
import { notEnoughTime, notEnoughCash } from './actions'

const mockStore = configureStore([thunk])
const testStore = (player) => mockStore({
  economy: {reading: 3},
  players: {current: 0, all: [player]}
})

describe('players/thunks', () => {
  describe('buy', () => {
    const position = 5

    test('boughtProduct', () => {
      const product = {...buildings[5].products[0], price: 82}
      const {dispatch, getActions} = testStore({position, cash: product.price})

      dispatch(buy(product.name))
      expect(getActions()).toEqual([boughtProduct(product)])
    })

    test('notEnoughCash', () => {
      const {dispatch, getActions} = testStore({position, cash: 0})

      dispatch(buy('Cola'))
      expect(getActions()).toEqual([notEnoughCash()])
    })
  })

  describe('enroll', () => {
    const position = 9

    test('enrolled', () => {
      const {dispatch, getActions} = testStore({position, cash: 52})

      dispatch(enroll())
      expect(getActions()).toEqual([enrolled(52)])
    })

    test('notEnoughCash', () => {
      const {dispatch, getActions} = testStore({position, cash: 0})

      dispatch(enroll())
      expect(getActions()).toEqual([notEnoughCash()])
    })
  })

  describe('relax', () => {
    test('relaxed', () => {
      const {dispatch, getActions} = testStore({timeLeft: 60})

      dispatch(relax())
      expect(getActions()).toEqual([relaxed()])
    })

    test('notEnoughTime', () => {
      const {dispatch, getActions} = testStore({timeLeft: 0})

      dispatch(relax())
      expect(getActions()).toEqual([notEnoughTime()])
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

  test('enrolled', () => {
    const {all: [player]} = reduce(
      {current: 0, all: [{cash: 52, enrollments: 0}]},
      enrolled(52)
    )

    expect(player.cash).toEqual(0)
    expect(player.enrollments).toEqual(1)
  })

  test('relaxed', () => {
    const {all: [player]} = reduce(
      {current: 0, all: [{timeLeft: 60}]},
      relaxed()
    )

    expect(player.timeLeft).toEqual(54)
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