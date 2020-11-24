import { useDispatch } from 'react-redux'
import gameSlice from '../model/slice'
import getPosition from '../helpers/getPosition'

export default function Space({ id, name }) {
  const dispatch = useDispatch()
  const { moveTo } = gameSlice.actions

  const size = 20
  const {top, left, bottom, right} = getPosition(size, id)

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