import { useSelector, useDispatch } from 'react-redux'
import { getWeekend, getTopNotice, dismissTopNotice } from '../state/ui'

export default function Notice() {
  const dispatch = useDispatch()
  const weekend = useSelector(getWeekend)
  const notice = useSelector(getTopNotice)

  if (weekend || !notice) return null

  return (
    <>
      <div className="background" onClick={() => dispatch(dismissTopNotice())}>
        <div className="notice">
          {notice}
        </div>
      </div>

      <style jsx>{`
        .background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .notice {
          border: 1px solid #6e5b45;
          background: #fff;
          width: 80vw;
          font-size: 12px;
          padding: 20px;
          text-align: center;
          border-radius: 5px;
          white-space: pre-wrap;
        }
      `}</style>
    </>
  )
}