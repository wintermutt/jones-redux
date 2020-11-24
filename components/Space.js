import { useDispatch } from 'react-redux'
import gameSlice from '../model/slice'

export default function Space({ id, name }) {
  const dispatch = useDispatch()
  const { increment } = gameSlice.actions

  const size = 20
  let [top, left, bottom, right] = Array(4).fill('unset')

  if (id < 4) {
    top = 0
    left = `${size * id}%`
  } else if (id < 8) {
    right = 0
    top = `${size * (id - 4)}%`
  } else if (id < 12) {
    bottom = 0
    right = `${size * (id - 8)}%`
  } else {
    left = 0
    bottom = `${size * (id - 12)}%`
  }

  return (
    <>
      <div onClick={() => dispatch(increment())}>
        {name}
      </div>

      <style jsx>{`
        div {
          position: absolute;
          top: ${top};
          left: ${left};
          bottom: ${bottom};
          right: ${right};
          border: 1px solid purple;
          width: ${size}%;
          height: ${size}%;
          background: rgba(200, 200, 200, 0.5);
          font-size: 0.6em;
          text-align: center;
          padding-top: 3px;
        }
      `}</style>
    </>
  )
}