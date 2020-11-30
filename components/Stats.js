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
        <div>Week #: { week }</div>
        <div>Time Left: { timeLeft } hours</div>
        <div>Player { currentPlayer + 1 }</div>
        {job &&
          <>
            <div>Works at { job.employer }</div>
            <div>As a { job.name }</div>
            <div>Hourly wage: ${ wage }</div>
          </>
        }
        {!job &&
          <div>Unemployed</div>
        }
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