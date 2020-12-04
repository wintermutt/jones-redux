import { useSelector } from 'react-redux'
import Space from '../components/Space'
import Dialog from '../components/Dialog'
import Token from '../components/Token'
import BoardMiddle from '../components/BoardMiddle'

export default function Board({spaceWidth, spaceHeight}) {
  const {spaces} = useSelector(state => state.game)

  return (
    <>
      <div className="board">
        <BoardMiddle spaceWidth={spaceWidth} spaceHeight={spaceHeight}/>

        {spaces.map((s, i) =>
          <Space id={i} key={i} space={s} width={spaceWidth} height={spaceHeight}/>
        )}

        <Token width={spaceWidth} height={spaceHeight}/>

        <Dialog/>
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