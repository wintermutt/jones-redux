import Head from 'next/head'
import { useSelector } from 'react-redux'
import Space from '../components/Space'

export default function Home() {
  const { counter } = useSelector(state => state.game)

  return (
    <>
      <Head>
        <title>Jones Redux</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="board">
          <Space/>
        </div>
        <div className="stats">
          Counter: { counter }
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
