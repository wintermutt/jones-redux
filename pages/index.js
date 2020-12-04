import Head from 'next/head'
import Stats from '../components/Stats'
import Space from '../components/Space'
import Dialog from '../components/Dialog'
import Token from '../components/Token'
import BoardMiddle from '../components/BoardMiddle'
import { useSelector } from 'react-redux'

export default function Home() {
  const {spaces, inside} = useSelector(state => state.game)
  const spaceWidth = 20
  const spaceHeight = 14

  return (
    <>
      <Head>
        <title>Jones Redux</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Stats/>
        
        <div className="board">
          <BoardMiddle spaceWidth={spaceWidth} spaceHeight={spaceHeight}/>

          {spaces.map((s, i) =>
            <Space id={i} key={i} space={s} width={spaceWidth} height={spaceHeight}/>
          )}
          <Token width={spaceWidth} height={spaceHeight}/>

          {inside &&
            <Dialog/>
          }
        </div>
        
      </main>

      <style jsx>{`
        main {
          display: flex;
          height: 100vh;
          flex-direction: column;
        }

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
