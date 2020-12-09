import { useSelector } from 'react-redux'
import { getCurrentPlayerNumber, getCurrentPlayer } from '../state/players'

export default function Stats() {
  const number = useSelector(getCurrentPlayerNumber)
  const {
    week,
    timeLeft,
    job,
    cash,
    enrollments
  } = useSelector(getCurrentPlayer)

  return (
    <>
      <div className="stats">
        <div>Week # {week}, {timeLeft} hours left</div>
        <div>Player {number}: {job ? `${job.name} at ${job.employer}` : 'Unemployed'}</div>
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