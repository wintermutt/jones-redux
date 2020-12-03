import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import gameSlice from '../model/slice'
import Bubble from './Bubble'
import Menu from './Menu'

export default function Dialog() {
  const dispatch = useDispatch()
  const {exit} = gameSlice.actions

  const spacing = '50px'

  const building = useSelector(state => state.game.spaces[state.game.position])
  const portrait = building.portrait || 'employment-office.jpg'
  const backgroundColor = building.internalBackground || '#f8e1c6'

  const buttons = useSelector(state => state.game.ui.buttons)

  return (
    <>
      <div className="container">
        <h1>{building.name}</h1>

        <div className="portrait">
          <Bubble/>
          <img width="80" height="100" src={`/portraits/${portrait}`}/>
        </div>

        <Menu/>

        <div className="actions">
          {buttons.map(b =>
            <button onClick={() => dispatch(gameSlice.actions[b.action](b.payload))} key={b.label}>
              {b.label}
            </button>
          )}
          <button onClick={() => dispatch(exit())}>
            Done
          </button>
        </div>
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