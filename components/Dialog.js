import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import gameSlice from '../model/slice'
import Bubble from './Bubble'

export default function Dialog() {
  const dispatch = useDispatch()
  const {exit} = gameSlice.actions

  const spacing = '50px'

  const { title, bubble, menu, buttons } = useSelector(state => {
    const {spaces, position, ui} = state.game
    return {
      title: spaces[position].name,
      bubble: ui.bubble,
      menu: ui.menu,
      buttons: ui.buttons
    }
  })

  return (
    <>
      <div className="container">
        <h1>{title}</h1>

        <div className="portrait">
          <Bubble text={bubble}/>
          <img width="80" height="100" src="/portraits/employment-office.jpg"/>
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
          border: 2px solid rgb(214, 185, 153);
          background: rgba(248, 225, 198);
          box-shadow: 2px 2px 1px black;
        }

        h1 {
          font-size: 12px;
          color: white;
          background: rgb(190, 152, 126);
          margin: 0;
          padding: 10px;
          position: absolute;
          top: -5px;
          left: 10px;
          right: 90px;
          height: 90px;
          display: flex;
          align-items: center;
          text-align: center;
          justify-content: center;
          text-transform: uppercase;
          text-shadow: -1px -1px 1px black;
          box-shadow: 2px 2px 1px black;
        }

        .portrait {
          position: absolute;
          top: -21px;
          right: -5px;
          box-shadow: 2px 2px 1px black;
          background-color: white;
          padding: 3px;
          padding-bottom: 0;
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
          top: 95px;
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
          border: 2px solid rgb(214, 185, 153, 0.4);
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