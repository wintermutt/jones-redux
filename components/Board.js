import { getNumberOfBuildings } from '../state/buildings'
import Tile from '../components/Tile'
import Window from '../components/Window'
import Token from '../components/Token'
import BoardMiddle from '../components/BoardMiddle'

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

        <Window/>
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