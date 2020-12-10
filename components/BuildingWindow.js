import { useSelector, useDispatch } from 'react-redux'
import { isCurrentPlayerInside, enroll, work, leaveBuilding } from '../state/players'
import { getCurrentBuilding, canEnrollHere, canWorkHere } from '../state/buildings'
import { getContext, goBack } from '../state/ui'

import Window from './Window'
import SpeechBubble from './SpeechBubble'
import Portrait from './Portrait'
import Menu from './Menu'
import ButtonRow from './ButtonRow'
import Button from './Button'

export default function BuildingWindow() {
  const dispatch = useDispatch()
  
  const inside = useSelector(isCurrentPlayerInside)
  const building = useSelector(getCurrentBuilding)
  const context = useSelector(getContext)
  const canEnroll = useSelector(canEnrollHere)
  const canWork = useSelector(canWorkHere)

  return <Window
    show={inside}
    title={building.name}
    backgroundColor={building.internalBackground}
  >
    <SpeechBubble/>
    <Portrait/>
    <Menu/>

    <ButtonRow>
      {context.name === 'employerJobs' &&
        <Button onClick={() => dispatch(goBack())} text="Back"/>
      }
      {canEnroll && <Button onClick={() => dispatch(enroll())} text="Enroll"/>}
      {canWork && <Button onClick={() => dispatch(work())} text="Work"/>}
      <Button onClick={() => dispatch(leaveBuilding())} text="Done"/>
    </ButtonRow>
  </Window>
}