import { useDispatch } from 'react-redux'
import gameSlice from '../model/slice'
import getPosition from '../helpers/getPosition'

export default function Space({ id, name, width, height }) {
  const dispatch = useDispatch()
  const { moveTo } = gameSlice.actions

  const {top, left, bottom, right} = getPosition(width, height, id)

  return (
    <>
      <div onClick={() => dispatch(moveTo(id))}>
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
          width: ${width}vw;
          height: ${height}vh;
          background: rgba(200, 200, 200, 0.5);
          font-size: 0.5em;
          text-align: center;
          padding: 4px;
          font-weight: bold;
          text-transform: uppercase;
        }
      `}</style>
    </>
  )
}