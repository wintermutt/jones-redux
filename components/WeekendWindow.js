import { useSelector, useDispatch } from 'react-redux'
import { getCurrentPlayerNumber, getCurrentPlayerWeekend } from '../state/players'
import { isWeekendDismissed, dismissWeekend } from '../state/ui'

import Window from './Window'
import Header from './Header'
import Title from './Title'
import ButtonRow from './ButtonRow'
import Button from './Button'

export default function WeekendWindow() {
  const dispatch = useDispatch()
  const number = useSelector(getCurrentPlayerNumber)
  const weekend = useSelector(getCurrentPlayerWeekend)
  const dismissed = useSelector(isWeekendDismissed)
  
  if (weekend === null || dismissed) return null

  return (
    <>
      <Window
        show={true}
        backgroundColor="#8ad19a"
      >
        <Header>
          <Title text="Oh What a Weekend!"/>
        </Header>

        <div className="text">
          <p>Player {number}</p>
          <p>{weekend.text}</p>
          <p>You spent ${weekend.spent}.</p>
        </div>

        <ButtonRow>
          <Button onClick={() => dispatch(dismissWeekend())} text="Done"/>
        </ButtonRow>
      </Window>

      <style jsx>{`
        .text {
          font-size: 10px;
          text-align: center;
          margin-top: 110px;
        }
      `}</style>
    </>
  )
}