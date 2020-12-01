import { useSelector } from 'react-redux'

export default function Stats() {
  const {
    currentPlayer, week, timeLeft, cash, job, wage
  } = useSelector(state => {
    const game = state.game
    const player = game.players[game.currentPlayer]
    const {cash, job} = player

    return {
      ...game,
      cash,
      job,
      wage: job ? job.wage : null
    }
  })

  return (
    <>
      <div className="stats">
        <div>Week # {week}, {timeLeft} hours left</div>
        <div>Player {currentPlayer + 1}: {job ? `${job.name} at ${job.employer}` : 'Unemployed'}</div>
        <div>Cash: ${Math.round(cash)}</div>
      </div>

      <style jsx>{`
        .stats {
          flex-grow: 1;
          padding: 15px;
          font-size: 8px;
          line-height: 200%;
        }
      `}</style>
    </>
  )
}