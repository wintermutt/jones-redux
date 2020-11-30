import { useDispatch } from 'react-redux'
import gameSlice from '../model/slice'
import getPosition from '../helpers/getPosition'

export default function Space({ id, space, width, height }) {
  const dispatch = useDispatch()
  const { moveTo } = gameSlice.actions

  const {top, left, bottom, right} = getPosition(width, height, id)

  return (
    <>
      <div onClick={() => dispatch(moveTo(id))}>
        {space.name}
      </div>

      <style jsx>{`
        div {
          position: absolute;
          top: ${top};
          left: ${left};
          bottom: ${bottom};
          right: ${right};
          width: ${width}vw;
          height: ${height}vh;
          background: ${space.background || '#ddd'};
          color: #fff;
          font-size: 6px;
          line-height: 200%;
          text-align: center;
          padding: 4px;
          font-weight: bold;
          text-transform: uppercase;
        }
      `}</style>
    </>
  )
}