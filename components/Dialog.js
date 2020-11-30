import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import gameSlice from '../model/slice'
import Bubble from './Bubble'

export default function Dialog() {
  const dispatch = useDispatch()
  const {exit} = gameSlice.actions

  const spacing = '50px'

  const { title, portrait, bubble, menu, buttons, background } = useSelector(state => {
    const {spaces, position, ui} = state.game
    const building = spaces[position]
    return {
      title: building.name,
      portrait: building.portrait || 'employment-office.jpg',
      bubble: ui.bubble,
      menu: ui.menu,
      buttons: ui.buttons,
      background: building.internalBackground || '#f8e1c6'
    }
  })

  return (
    <>
      <div className="container">
        <h1>{title}</h1>

        <div className="portrait">
          <Bubble text={bubble}/>
          <img width="80" height="100" src={`/portraits/${portrait}`}/>
        </div>

        <ul className="menu">
          {menu.map(i =>
            <li onClick={() => dispatch(gameSlice.actions[i.action](i.payload))} key={i.label}>
              {i.label}
              {i.amount &&
                <span className="amount">${i.amount}</span>
              }
            </li>
          )}
        </ul>

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
          border: 1px solid black;
          background: ${background};
        }

        h1 {
          font-size: 12px;
          color: white;
          background: rgba(0, 0, 0, 0.5);
          margin: 0;
          padding: 10px;
          position: absolute;
          top: -1px;
          left: -1px;
          right: 80px;
          height: 102px;
          display: flex;
          align-items: center;
          text-align: center;
          justify-content: center;
          text-transform: uppercase;
          border: 1px solid black;
        }

        .portrait {
          position: absolute;
          top: -1px;
          right: -1px;
          padding: 0;
          border: 1px solid black;
        }

        .portrait img {
          margin-bottom: -4px;
        }

        .menu {
          flex-grow: 1;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          align-content: flex-start;
          margin: 0;
          padding: 5px;
          list-style-type: none;
          position: absolute;
          top: 100px;
          bottom: 25px;
          left: 0;
          right: 0;
        }

        .menu li {
          padding: 7px;
          margin: 1px;
          width: calc(50% - 2px);
          height: 50px;
          cursor: pointer;
          background-color: rgba(255, 255, 255, 0.3);
          font-size: 8px;
          line-height: 150%;
          position: relative;
        }

        .menu li .amount {
          position: absolute;
          right: 5px;
          bottom: 3px;
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
          font-family: 'Press Start 2P';
          font-size: 10px;
          text-transform: uppercase;
          padding: 8px;
          margin-left: 5px;
          background: green;
          color: white;
          border-width: 3px;
          border-color: rgb(129, 190, 129) rgb(6, 97, 6) rgb(6, 97, 6) rgb(129, 190, 129);
        }
      `}</style>
    </>
  )
}