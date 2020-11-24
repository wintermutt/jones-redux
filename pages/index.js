import Head from 'next/head'
import { useSelector, useDispatch } from 'react-redux'
import gameSlice from '../model/slice'

export default function Home() {
  const { counter } = useSelector(state => state.game)

  const dispatch = useDispatch()
  const { increment } = gameSlice.actions

  return (
    <>
      <div className="container">
        <Head>
          <title>Jones Redux</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <h1>Jones Redux</h1>

          <p className="description">
            Counter: { counter }
          </p>

          <button onClick={() => dispatch(increment())}>
            Increment
          </button>
        </main>

        <footer></footer>
      </div>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        h1 a {
          color: #0070f3;
          text-decoration: none;
        }

        h1 a:hover,
        h1 a:focus,
        h1 a:active {
          text-decoration: underline;
        }

        h1 {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        h1,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }
      `}</style>
    </>
  )
}
