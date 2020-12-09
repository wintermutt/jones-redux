import { useSelector } from 'react-redux'
import { getCurrentBuilding } from '../state/buildings'
import SpeechBubble from './SpeechBubble'
import Portrait from './Portrait'
import Menu from './Menu'
import ActionButtons from './ActionButtons'

export default function Window() {
  const {inside} = useSelector(state => state.game)
  const building = useSelector(getCurrentBuilding)

  if (!inside) return null
  
  const backgroundColor = building.internalBackground || '#f8e1c6'
  
  const spacing = '50px'
  
  return (
    <>
      <div className="container">
        <h1>{building.name}</h1>

        <SpeechBubble/>
        <Portrait/>
        <Menu/>
        <ActionButtons/>
      </div>

      <style jsx>{`
        .container {
          position: absolute;
          top: ${spacing};
          left: ${spacing};
          bottom: ${spacing};
          right: ${spacing};
          border: 2px solid black;
          background: ${backgroundColor};
        }

        h1 {
          font-size: 12px;
          color: white;
          background: rgba(0, 0, 0, 0.5);
          margin: 0;
          padding: 10px;
          position: absolute;
          top: -2px;
          left: -2px;
          right: 80px;
          height: 104px;
          display: flex;
          align-items: center;
          text-align: center;
          justify-content: center;
          text-transform: uppercase;
          border: 2px solid black;
        }
      `}</style>
    </>
  )
}