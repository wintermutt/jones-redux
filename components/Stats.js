import { useSelector } from 'react-redux'

export default function Stats() {
  const {
    currentPlayer, week, timeLeft, cash
  } = useSelector(state => {
    return {
      ...state.game,
      cash: state.game.players[state.game.currentPlayer].cash
    }
  })

  return (
    <>
      <div className="stats">
        <div>Player: { currentPlayer + 1 }</div>
        <div>Week #: { week }</div>
        <div>Time Left: { timeLeft } hours</div>
        <div>Cash: ${ cash.toFixed(2) }</div>
      </div>

      <style jsx>{`
        .stats {
          flex-grow: 1;
          padding: 15px;
          font-size: 0.7em;
        }
      `}</style>
    </>
  )
}