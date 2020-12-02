import { useSelector } from 'react-redux'

export default function Stats() {
  const {
    currentPlayer, week, timeLeft, cash, job, wage, enrollments
  } = useSelector(state => {
    const game = state.game
    const player = game.players[game.currentPlayer]
    const {cash, job, enrollments} = player

    return {
      ...game,
      cash,
      job,
      enrollments
    }
  })

  return (
    <>
      <div className="stats">
        <div>Week # {week}, {timeLeft} hours left</div>
        <div>Player {currentPlayer + 1}: {job ? `${job.name} at ${job.employer}` : 'Unemployed'}</div>
        {job &&
          <div>Hourly Wage: ${job.wage}</div>
        }
        <div>Cash: ${Math.round(cash)}</div>
        <div>Enrollments: {enrollments}</div>
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