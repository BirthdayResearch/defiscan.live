import React from 'react'
import Head from 'next/head'

export default function Home (): JSX.Element {
  return (
    <div className='container mx-auto px-4 py-6'>
      <Head>
        <title>DeFiChain MasterNode Voting</title>
        <meta name='description' content='DeFiChain MasterNode Voting' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <h1 className='text-2xl font-medium'>
          DeFiChain Explorer
        </h1>
      </main>

      <footer />
    </div>
  )
}
