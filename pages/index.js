import Head from 'next/head'
import { useSelector } from 'react-redux'
import Space from '../components/Space'

export default function Home() {
  const { spaces, counter } = useSelector(state => state.game)

  return (
    <>
      <Head>
        <title>Jones Redux</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="stats">
          Counter: { counter }
        </div>
        <div className="board">
          {spaces.map((s, i) =>
            <Space id={i} key={i}/>
          )}
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

        .stats {
          border: 5px solid blue;
          flex-grow: 1;
          padding: 10px;
        }
      `}</style>
    </>
  )
}
