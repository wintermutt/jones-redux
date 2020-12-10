import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isReady } from '../state/players'
import { newTurn } from '../state/actions'
import Head from 'next/head'
import Board from '../components/Board'
import Stats from '../components/Stats'

export default function Home() {
  const ready = useSelector(isReady)
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(newTurn())
  }, [])

  return (
    <>
      <Head>
        <title>Jones Redux</title>
      </Head>

      <main>
        {ready &&
          <>
            <Stats/>
            <Board spaceWidth={20} spaceHeight={14}/>
          </>
        }
      </main>

      <style jsx>{`
        main {
          display: flex;
          height: 100vh;
          flex-direction: column;
        }
      `}</style>
    </>
  )
}
