import { useDispatch } from 'react-redux'
import { moveTo } from '../state/players'
import { getBuildingAt } from '../state/buildings'
import getPositionCSS from '../helpers/getPositionCSS'

export default function Tile({position, width, height}) {
  const dispatch = useDispatch()

  const building = getBuildingAt(position)
  const {top, left, bottom, right} = getPositionCSS(width, height, position)

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