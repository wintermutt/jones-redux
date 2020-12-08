import { useSelector } from 'react-redux'
import { getCurrentBuilding } from '../state/game'

export default function Portrait() {
  let {portrait} = useSelector(getCurrentBuilding)
  if (!portrait) portrait = 'employment-office.jpg'

  return (
    <>
      <div className="portrait">
        <img width="80" height="100" src={`/portraits/${portrait}`}/>
      </div>

      <style jsx>{`
        .portrait {
          position: absolute;
          top: -2px;
          right: -2px;
          padding: 0;
          border: 2px solid black;
        }

        .portrait img {
          margin-bottom: -4px;
        }
      `}</style>
    </>
  )
}