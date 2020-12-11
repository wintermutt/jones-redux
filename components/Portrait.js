import { useSelector } from 'react-redux'
import { getCurrentBuilding } from '../state/buildings'

export default function Portrait() {
  const {portrait} = useSelector(getCurrentBuilding)

  return (
    <>
      <img
        width="80"
        height="100"
        src={`/portraits/${portrait || 'employment-office.jpg'}`}
      />

      <style jsx>{`
        img {
          display: inline-block;
          border-left: 2px solid black;
        }
      `}</style>
    </>
  )
}