import { useSelector } from 'react-redux'
import Tile from '../components/Tile'
import Window from '../components/Window'
import Token from '../components/Token'
import BoardMiddle from '../components/BoardMiddle'

export default function Board({spaceWidth, spaceHeight}) {
  const {buildings} = useSelector(state => state.game)

  return (
    <>
      <div className="board">
        <BoardMiddle spaceWidth={spaceWidth} spaceHeight={spaceHeight}/>

        {buildings.map((b, i) =>
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