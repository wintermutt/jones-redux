import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import gameSlice from '../model/slice'

export default function ActionButtons() {
  const dispatch = useDispatch()
  const {exit} = gameSlice.actions

  const buttons = useSelector(state => state.game.ui.buttons)

  return (
    <>
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