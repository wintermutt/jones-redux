import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useSelector, useDispatch } from 'react-redux'
import gameSlice from '../model/slice'

export default function Home() {
  const { counter } = useSelector(state => state.game)

  const dispatch = useDispatch()
  const { increment } = gameSlice.actions

  return (
    <div className={styles.container}>
      <Head>
        <title>Jones Redux</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Jones Redux
        </h1>

        <p className={styles.description}>
          Counter: { counter }
        </p>

        <button onClick={() => dispatch(increment())}>
          Increment
        </button>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}
