import Head from 'next/head'
import Stats from '../components/Stats'
import Space from '../components/Space'
import Dialog from '../components/Dialog'
import Token from '../components/Token'
import { useSelector } from 'react-redux'

export default function Home() {
  const { spaces, position, inside } = useSelector(state => state.game)
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
          <div className="middle"></div>

          {spaces.map((s, i) =>
            <Space id={i} key={i} space={s} width={spaceWidth} height={spaceHeight}/>
          )}
          <Token position={position} width={spaceWidth} height={spaceHeight}/>

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

        .middle {
          position: absolute;
          top: ${spaceHeight}vh;
          left: ${spaceWidth}vw;
          right: ${spaceWidth}vw;
          bottom: ${spaceHeight}vh;
          background-color: rgb(200, 239, 253);
          background-image: url(/players/player1.png);
          background-position: center;
          background-size: contain;
          background-repeat: no-repeat;
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
