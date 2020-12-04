import { useSelector } from 'react-redux'

export default function BoardMiddle({spaceWidth, spaceHeight}) {
  const {currentPlayer} = useSelector(state => state.game)

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
          background-image: url(/players/player${currentPlayer + 1}.png);
          background-position: center;
          background-size: contain;
          background-repeat: no-repeat;
          border: 2px solid black;
        }
      `}</style>
    </>
  )
}