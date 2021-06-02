import React, { useState } from 'react'
import Head from 'next/head'

export default function Home (): JSX.Element {
  const [owner, setOwner] = useState('a1') // as hex
  const [data, setData] = useState('b1') // as hex

  return (
    <div className='container mx-auto px-4 py-6'>
      <Head>
        <title>DeFiChain MasterNode Voting</title>
        <meta name='description' content='DeFiChain MasterNode Voting' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <h1 className='text-2xl font-medium'>
          DeFiChain MasterNode Voting
        </h1>

        <input type='text' value={owner} onChange={({ target: { value } }) => setOwner(value)} />
        <input type='text' value={data} onChange={({ target: { value } }) => setData(value)} />
      </main>

      <footer />
    </div>
  )
}
