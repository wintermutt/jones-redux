import { useSelector, useDispatch } from 'react-redux'
import gameSlice from '../model/slice'
import getPosition from '../helpers/getPosition'

export default function Tile({position, width, height}) {
  const dispatch = useDispatch()
  const {moveTo} = gameSlice.actions

  const building = useSelector(state => state.game.buildings[position])
  const {top, left, bottom, right} = getPosition(width, height, position)

  return (
    <>
      <div onClick={() => dispatch(moveTo(position))}>
        {building.name}
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
          background: ${building.background || '#ddd'};
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