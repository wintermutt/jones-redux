import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import {
  canEnrollHere,
  canWorkHere,
  enroll,
  work,
  leaveBuilding
} from '../state/game'
import { getContext, goBack } from '../state/ui'

export default function ActionButtons() {
  const dispatch = useDispatch()

  const context = useSelector(getContext)
  const canEnroll = useSelector(canEnrollHere)
  const canWork = useSelector(canWorkHere)

  return (
    <>
      <div className="actions">
        {context.name === 'employerJobs' &&
          <button onClick={() => dispatch(goBack())}>Back</button>
        }

        {canEnroll && <button onClick={() => dispatch(enroll())}>Enroll</button>}

        {canWork && <button onClick={() => dispatch(work())}>Work</button>}

        <button onClick={() => dispatch(leaveBuilding())}>Done</button>
      </div>

      <style jsx>{`
        .actions {
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          position: absolute;
          bottom: 0;
          transform: translateY(50%);
          right: 10px;
        }

        button {
          position: relative;
          font-family: 'Press Start 2P';
          font-size: 10px;
          text-transform: uppercase;
          padding: 8px;
          margin-left: 10px;
          background: green;
          color: rgb(204, 224, 204);
          border-width: 3px;
          border-color: rgb(129, 190, 129) rgb(59, 168, 59) rgb(59, 168, 59) rgb(129, 190, 129);
          outline: none;
        }

        button:before {
          content: '';
          position: absolute;
          top: -5px;
          left: -5px;
          bottom: -5px;
          right: -5px;
          border: 2px solid black;
        }

        button:active {
          filter: invert(100%)
        }
      `}</style>
    </>
  )
}