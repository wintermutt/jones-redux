import { useSelector } from 'react-redux'
import { getCurrentPlayer } from '../state/game'

export default function Stats() {
  const {week} = useSelector(state => state.game)
  const {timeLeft} = useSelector(state => state.game)
  const {currentPlayer} = useSelector(state => state.game)

  const {cash} = useSelector(getCurrentPlayer)
  const {enrollments} = useSelector(getCurrentPlayer)
  const {job} = useSelector(getCurrentPlayer)

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