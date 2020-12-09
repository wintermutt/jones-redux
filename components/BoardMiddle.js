import { useSelector } from 'react-redux'
import { getCurrentPlayerNumber } from '../state/players'

export default function BoardMiddle({spaceWidth, spaceHeight}) {
  const number = useSelector(getCurrentPlayerNumber)

  return (
    <>
      <div className="middle"></div>

      <style jsx>{`
        .middle {
          position: absolute;
          top: ${spaceHeight}vh;
          left: ${spaceWidth}vw;
          right: ${spaceWidth}vw;
          bottom: ${spaceHeight}vh;
          background-color: rgb(200, 239, 253);
          background-image: url(/players/player${number}.png);
          background-position: center;
          background-size: contain;
          background-repeat: no-repeat;
          border: 2px solid black;
        }
      `}</style>
    </>
  )
}