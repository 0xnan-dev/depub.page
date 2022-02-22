import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Layout from '../components/Layout'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>depub.Page</title>
        <meta name="description" content="depub.Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>

        <main className={styles.main}>
        </main>
      </Layout>


    </div>
  )
}

export default Home
