import { getNumberOfBuildings } from '../state/buildings'
import BoardMiddle from '../components/BoardMiddle'
import Tile from '../components/Tile'
import Token from '../components/Token'
import BuildingWindow from '../components/BuildingWindow'
import WeekendWindow from '../components/WeekendWindow'
import Notice from '../components/Notice'

const tiles = Array(getNumberOfBuildings())
  .fill(null)
  .map((_, i) => i)

export default function Board({spaceWidth, spaceHeight}) {
  return (
    <>
      <div className="board">
        <BoardMiddle spaceWidth={spaceWidth} spaceHeight={spaceHeight}/>

        {tiles.map(i =>
          <Tile position={i} key={i} width={spaceWidth} height={spaceHeight}/>
        )}

        <Token width={spaceWidth} height={spaceHeight}/>

        <BuildingWindow/>
        <WeekendWindow/>
        <Notice/>
      </div>

      <style jsx>{`
        .board {
          display: flex;
          position: relative;
          flex-direction: row;
          flex-wrap: wrap;
          height: ${spaceHeight * 5}vh;
        }
      `}</style>
    </>
  )
}