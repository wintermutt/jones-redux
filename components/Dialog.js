import { useSelector } from 'react-redux'
import Bubble from './Bubble'
import Menu from './Menu'
import ActionButtons from './ActionButtons'

export default function Dialog() {
  const spacing = '50px'

  const building = useSelector(state => state.game.spaces[state.game.position])
  const portrait = building.portrait || 'employment-office.jpg'
  const backgroundColor = building.internalBackground || '#f8e1c6'

  return (
    <>
      <div className="container">
        <h1>{building.name}</h1>

        <Bubble/>
        
        <div className="portrait">
          <img width="80" height="100" src={`/portraits/${portrait}`}/>
        </div>

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