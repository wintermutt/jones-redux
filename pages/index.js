import Head from 'next/head'
import Board from '../components/Board'
import Stats from '../components/Stats'

export default function Home() {
  return (
    <>
      <Head>
        <title>Jones Redux</title>
      </Head>

      <main>
        <Stats/>        
        <Board spaceWidth={20} spaceHeight={14}/>
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
