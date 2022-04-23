import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Editor from '../components/Editor';
import React from 'react';

const Home: NextPage = (props: any) => {

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Daglo Sharing App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Editor />
      </main>
    </div>
  )
}

export default React.memo(Home)
