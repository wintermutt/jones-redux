import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import gameSlice from '../model/slice'

export default function Dialog() {
  const dispatch = useDispatch()
  const {exit} = gameSlice.actions

  const spacing = '50px'

  const { title, menu } = useSelector(state => {
    const {spaces, position} = state.game
    return {
      title: spaces[position].name,
      menu: state.game.menu
    }
  })

  return (
    <>
      <div className="container">
        <h1>{title}</h1>

        <ul className="menu">
          {menu.map(i =>
            <li onClick={() => dispatch(gameSlice.actions[i.action](i.payload))} key={i.label}>
              {i.label}
            </li>
          )}
        </ul>

        <div className="actions">
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
          border: 1px solid purple;
          background: rgba(248, 225, 198, 0.9);
          box-shadow: 0 1px 5px black;
          display: flex;
          flex-direction: column;
        }

        h1 {
          padding: 5px;
          margin: 0;
          margin-bottom: 5px;
          font-size: 1.4em;
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