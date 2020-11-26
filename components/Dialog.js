import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import gameSlice from '../model/slice'

export default function Dialog() {
  const dispatch = useDispatch()
  const {exit} = gameSlice.actions

  const spacing = '50px'

  const { title } = useSelector(state => {
    const {spaces, position} = state.game
    return {
      title: spaces[position].name
    }
  })

  return (
    <>
      <div>
        <h1>{title}</h1>
        <button onClick={() => dispatch(exit())}>
          Done
        </button>
      </div>

      <style jsx>{`
        div {
          position: absolute;
          top: ${spacing};
          left: ${spacing};
          bottom: ${spacing};
          right: ${spacing};
          padding: 10px;
          border: 1px solid purple;
          background: rgba(200, 200, 200, 0.9);
          box-shadow: 0 1px 5px black;
        }

        h1 {
          margin-top: 0;
          font-size: 1.5em;
        }

        button {
          position: absolute;
          bottom: 5px;
          right: 5px;
          font-size: 0.8em;
          text-transform: uppercase;
          padding: 10px;
        }
      `}</style>
    </>
  )
}