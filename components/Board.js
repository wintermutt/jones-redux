import { getPlayerNotices } from '../state/players'
import { isWeekendDismissed } from '../state/ui'
import { getNumberOfBuildings } from '../state/buildings'
import Tile from '../components/Tile'
import BuildingWindow from '../components/BuildingWindow'
import WeekendWindow from '../components/WeekendWindow'
import Modal from '../components/Modal'
import Token from '../components/Token'
import BoardMiddle from '../components/BoardMiddle'
import { useSelector } from 'react-redux'

const tiles = Array(getNumberOfBuildings())
  .fill(null)
  .map((_, i) => i)

export default function Board({spaceWidth, spaceHeight}) {
  const notices = useSelector(getPlayerNotices)
  const weekendDismissed = useSelector(isWeekendDismissed)

  return (
    <>
      <div className="board">
        <BoardMiddle spaceWidth={spaceWidth} spaceHeight={spaceHeight}/>

        {tiles.map(i =>
          <Tile position={i} key={i} width={spaceWidth} height={spaceHeight}/>
        )}

        <Token width={spaceWidth} height={spaceHeight}/>

        <BuildingWindow/>
        <WeekendWindow/>
        
        {weekendDismissed && notices.map((n, i) =>
          <Modal key={i}>{n}</Modal>
        )}
      </div>

      <style jsx>{`
        .board {
          display: flex;
          position: relative;
          flex-direction: row;
          flex-wrap: wrap;
          height: ${spaceHeight * 5}vh;
        }
      `}</style>
    </>
  )
}