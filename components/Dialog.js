import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import gameSlice from '../model/slice'
import Bubble from './Bubble'

export default function Dialog() {
  const dispatch = useDispatch()
  const {exit} = gameSlice.actions

  const spacing = '50px'

  const { title, menu, buttons } = useSelector(state => {
    const {spaces, position} = state.game
    return {
      title: spaces[position].name,
      menu: state.game.ui.menu,
      buttons: state.game.ui.buttons
    }
  })

  return (
    <>
      <div className="container">
        <h1>{title}</h1>

        <div className="portrait">
          <Bubble text="Welcome to ACNE Employment. We'll find you a job, no matter what it costs you!"/>
          <img width="80" height="100" src="/portraits/employment-office.jpg"/>
        </div>

        <ul className="menu">
          {menu.map(i =>
            <li onClick={() => dispatch(gameSlice.actions[i.action](i.payload))} key={i.label}>
              {i.label}
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
          padding: 5px;
          border: 1px solid rgb(214, 185, 153);
          background: rgba(248, 225, 198, 0.9);
          box-shadow: 0 1px 5px black;
        }

        h1 {
          font-size: 1.2em;
          color: white;
          background: rgb(190, 152, 126);
          margin: 0;
          padding: 5px;
          position: absolute;
          top: -5px;
          left: 15px;
          right: 90px;
          height: 90px;
          display: flex;
          align-items: center;
          text-align: center;
          justify-content: center;
          text-transform: uppercase;
          text-shadow: -1px -1px 1px black;
          box-shadow: 0 1px 5px black;
        }

        .portrait {
          position: absolute;
          top: -18px;
          right: -5px;
          box-shadow: 0 1px 5px black;
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
          padding: 0;
          list-style-type: none;
          position: absolute;
          top: 95px;
          bottom: 25px;
          left: 0;
          right: 0;
        }

        .menu li {
          padding: 5px;
          margin: 2px;
          width: calc(50% - 4px);
          height: 3em;
          cursor: pointer;
          background-color: rgba(255, 255, 255, 0.4);
          border: 1px solid rgb(214, 185, 153);
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
          font-size: 0.8em;
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