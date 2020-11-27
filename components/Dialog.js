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
          background: rgba(200, 200, 200, 0.9);
          box-shadow: 0 1px 5px black;
          display: flex;
          flex-direction: column;
        }

        h1 {
          margin: 0;
          font-size: 1.4em;
          border: 5px solid red;
        }

        .menu {
          border: 5px solid green;
          flex-grow: 1;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          margin: 0;
          padding: 0;
          list-style-type: none;
        }

        .menu li {
          border: 2px solid #666;
          padding: 5px;
          margin: 2px;
          width: calc(50% - 4px);
          cursor: pointer;
        }

        .actions {
          border: 5px solid blue;
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
        }

        button {
          font-size: 0.8em;
          text-transform: uppercase;
          padding: 8px;
          margin-left: 5px;
          display: inline-block;
        }
      `}</style>
    </>
  )
}