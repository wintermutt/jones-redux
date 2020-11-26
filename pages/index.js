import Head from 'next/head'
import Stats from '../components/Stats'
import Space from '../components/Space'
import Dialog from '../components/Dialog'
import Token from '../components/Token'
import { useSelector } from 'react-redux'

export default function Home() {
  const { spaces, position, inside } = useSelector(state => state.game)

  return (
    <>
      <Head>
        <title>Jones Redux</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Stats/>
        
        <div className="board">
          {spaces.map((s, i) =>
            <Space id={i} key={i} name={s.name}/>
          )}
          <Token position={position} />

          {inside &&
            <Dialog/>
          }
        </div>
        
      </main>

      <style jsx>{`
        main {
          display: flex;
          //width: 100%;
          height: 100vh;
          flex-direction: column;
          //justify-content: stretch;
          //align-items: flex-start;
          //padding: 0;
          border: 5px solid green;
        }

        .board {
          border: 5px solid red;
          display: flex;
          position: relative;
          flex-direction: row;
          flex-wrap: wrap;
          height: 100vw;
        }
      `}</style>
    </>
  )
}
