import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { buildings } from './static.yaml'

import reduce, {
  moveTo,
  buy, boughtProduct,
  enroll, enrolled,
  relax, relaxed,
  work, worked,
  leaveBuilding
} from './players'

import {
  movedTo,
  notEnoughTime,
  notEnoughCash,
  leftBuilding,
  turnEnded
} from './actions'

const mockStore = configureStore([thunk])

const economy = {reading: 3}
const lonePlayer = player => ({current: 0, all: [player]})

describe('players/thunks', () => {
  describe('moveTo', () => {
    const position = 2
    
    test('movedTo', () => {
      const destination = 5

      const {dispatch, getActions} = mockStore({
        players: lonePlayer({position, timeLeft: 60})
      })

      dispatch(moveTo(destination))
      expect(getActions()).toEqual([
        movedTo({
          destination,
          building: buildings[destination],
          timeSpent: (0.625 * 3) + 2
        })
      ])
    })

    test('leftBuilding', () => {
      const {dispatch, getActions} = mockStore({
        players: lonePlayer({position, inside: true})
      })

      dispatch(moveTo(3))
      expect(getActions()).toContainEqual(leftBuilding())
    })

    test('turnEnded', () => {
      const {dispatch, getActions} = mockStore({
        players: lonePlayer({position, timeLeft: 1})
      })

      dispatch(moveTo(4))
      expect(getActions()).toContainEqual(turnEnded())
    })
  })

  describe('buy', () => {
    const position = 5

    test('boughtProduct', () => {
      const product = {...buildings[5].products[0], price: 82}
      const {dispatch, getActions} = mockStore({
        economy,
        players: lonePlayer({position, cash: product.price})
      })

      dispatch(buy(product.name))
      expect(getActions()).toEqual([boughtProduct(product)])
    })

    test('notEnoughCash', () => {
      const {dispatch, getActions} = mockStore({
        economy,
        players: lonePlayer({position, cash: 0})
      })

      dispatch(buy('Cola'))
      expect(getActions()).toEqual([notEnoughCash()])
    })
  })

  describe('enroll', () => {
    const position = 9

    test('enrolled', () => {
      const {dispatch, getActions} = mockStore({
        economy,
        players: lonePlayer({position, cash: 52})
      })

      dispatch(enroll())
      expect(getActions()).toEqual([enrolled(52)])
    })

    test('notEnoughCash', () => {
      const {dispatch, getActions} = mockStore({
        economy,
        players: lonePlayer({position, cash: 0})
      })

      dispatch(enroll())
      expect(getActions()).toEqual([notEnoughCash()])
    })
  })

  describe('relax', () => {
    test('relaxed', () => {
      const {dispatch, getActions} = mockStore({
        players: lonePlayer({timeLeft: 60})
      })

      dispatch(relax())
      expect(getActions()).toEqual([relaxed()])
    })

    test('notEnoughTime', () => {
      const {dispatch, getActions} = mockStore({
        players: lonePlayer({timeLeft: 0})
      })

      dispatch(relax())
      expect(getActions()).toEqual([notEnoughTime()])
    })
  })

  describe('work', () => {
    const job = {employer: "Mr. Ronald's", name: 'Cook', wage: 5}

    test('worked', () => {
      const {dispatch, getActions} = mockStore({
        players: lonePlayer({job, timeLeft: 60})
      })

      dispatch(work())
      expect(getActions()).toEqual([worked({earnings: 40, timeSpent: 6})])
    })

    test('notEnoughTime', () => {
      const {dispatch, getActions} = mockStore({
        players: lonePlayer({job, timeLeft: 0})
      })

      dispatch(work())
      expect(getActions()).toEqual([notEnoughTime()])
    })
  })

  describe('leaveBuilding', () => {
    test('leftBuilding', () => {
      const {dispatch, getActions} = mockStore({
        players: lonePlayer({timeLeft: 60})
      })

      dispatch(leaveBuilding())
      expect(getActions()).toEqual([leftBuilding()])
    })

    test('leftBuilding, turnEnded', () => {
      const {dispatch, getActions} = mockStore({
        players: lonePlayer({timeLeft: 0})
      })

      dispatch(leaveBuilding())
      expect(getActions()).toContainEqual(leftBuilding())
      expect(getActions()).toContainEqual(turnEnded())
    })
  })
})

describe('players/reducers', () => {
  test('movedTo', () => {
    const timeLeft = 60

    const destination = 4
    const building = buildings[destination]
    const timeSpent = (0.625 * 2) + 2

    const {all: [player]} = reduce(
      lonePlayer({timeLeft, position: 2, inside: false}),
      movedTo({destination, building, timeSpent})
    )

    expect(player.timeLeft).toEqual(timeLeft - timeSpent)
    expect(player.position).toEqual(destination)
    expect(player.inside).toEqual(true)
  })

  test('boughtProduct', () => {
    const {all: [player]} = reduce(
      lonePlayer({cash: 100, hungry: true}),
      boughtProduct({price: 10, feeds: true})
    )

    expect(player.cash).toEqual(90)
    expect(player.hungry).toEqual(false)
  })

  test('enrolled', () => {
    const {all: [player]} = reduce(
      lonePlayer({cash: 52, enrollments: 0}),
      enrolled(52)
    )

    expect(player.cash).toEqual(0)
    expect(player.enrollments).toEqual(1)
  })

  test('relaxed', () => {
    const {all: [player]} = reduce(
      lonePlayer({timeLeft: 60}),
      relaxed()
    )

    expect(player.timeLeft).toEqual(54)
  })

  test('worked', () => {
    const {all: [player]} = reduce(
      lonePlayer({cash: 0, timeLeft: 60}),
      worked({earnings: 40, timeSpent: 6})
    )

    expect(player.cash).toEqual(40)
    expect(player.timeLeft).toEqual(54)
  })

  test('leftBuilding', () => {
    const {all: [player]} = reduce(
      lonePlayer({inside: true}),
      leftBuilding()
    )

    expect(player.inside).toEqual(false)
  })
})