import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { startGame, isGameLoading } from '../state/game'
import Head from 'next/head'
import Board from '../components/Board'
import Stats from '../components/Stats'

export default function Home() {
  const dispatch = useDispatch()
  const loading = useSelector(isGameLoading)
  
  useEffect(() => {
    dispatch(startGame())
  }, [])

  return (
    <>
      <Head>
        <title>Jones Redux</title>
      </Head>

      <main>
        {!loading &&
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
