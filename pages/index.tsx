import Head from 'next/head'
import styles from '../styles/Home.module.css'
import characters1 from '../pages/api/characters1'
import characters2 from '../pages/api/characters2'
import characters3 from '../pages/api/characters3'

export default function Home() {

  return (
    <div>
      <Head>
        <title>ABF - Media.Monks Challenge</title>
        <meta name="description" content="Andres Bastidas F - Media Monks Challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>

      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/andna/abf_mediamonks"
          target="_blank"
          rel="noopener noreferrer"
        >
          By Andres Bastidas Fierro @ 2022
        </a>
      </footer>
    </div>
  )
}
