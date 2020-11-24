import { useDispatch } from 'react-redux'
import gameSlice from '../model/slice'

export default function Space(props) {
  const dispatch = useDispatch()
  const { increment } = gameSlice.actions

  return (
    <>
      <div onClick={() => dispatch(increment())}></div>

      <style jsx>{`
        div {
          border: 5px solid purple;
          width: 20vw;
          height: 20vw;
        }
      `}</style>
    </>
  )
}