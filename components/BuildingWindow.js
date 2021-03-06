import { useSelector, useDispatch } from 'react-redux'
import { isPlayerInside, enroll, work, relax, leaveBuilding } from '../state/players'
import { getCurrentBuilding, canEnrollHere, canWorkHere, canRelaxHere } from '../state/buildings'
import { getContext, goBack } from '../state/ui'

import Window from './Window'
import Header from './Header'
import Title from './Title'
import SpeechBubble from './SpeechBubble'
import Portrait from './Portrait'
import Menu from './Menu'
import ButtonRow from './ButtonRow'
import Button from './Button'

export default function BuildingWindow() {
  const dispatch = useDispatch()
  
  const inside = useSelector(isPlayerInside)
  const building = useSelector(getCurrentBuilding)
  const context = useSelector(getContext)
  const canEnroll = useSelector(canEnrollHere)
  const canWork = useSelector(canWorkHere)
  const canRelax = useSelector(canRelaxHere)

  return <Window
    show={inside}
    backgroundColor={building.internalBackground}
  >
    <Header>
      <Title
        text={building.name}
        color={building.signForeground}
        backgroundColor={building.signBackground}
      />
      <Portrait/>
    </Header>

    <SpeechBubble/>
    <Menu/>

    <ButtonRow>
      {context.name === 'employerJobs' &&
        <Button onClick={() => dispatch(goBack())} text="Back"/>
      }
      {canEnroll && <Button onClick={() => dispatch(enroll())} text="Enroll"/>}
      {canRelax && <Button onClick={() => dispatch(relax())} text="Relax"/>}
      {canWork && <Button onClick={() => dispatch(work())} text="Work"/>}
      <Button onClick={() => dispatch(leaveBuilding())} text="Done"/>
    </ButtonRow>
  </Window>
}