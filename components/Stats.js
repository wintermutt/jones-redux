import { useSelector } from 'react-redux'

export default function Stats() {
  const {
    currentPlayer, week, timeLeft, cash, job
  } = useSelector(state => {
    const game = state.game
    const player = game.players[game.currentPlayer]
    const {cash, job} = player

    return {
      ...game,
      cash,
      job: job ? `${job.name} at ${job.employer}` : 'Unemployed'
    }
  })

  return (
    <>
      <div className="stats">
        <div>Player: { currentPlayer + 1 }</div>
        <div>Week #: { week }</div>
        <div>Time Left: { timeLeft } hours</div>
        <div>Cash: ${ cash.toFixed(2) }</div>
        <div>Job: { job }</div>
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