import React from 'react'
import Head from "next/head";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function Default (props: React.PropsWithChildren<any>): JSX.Element {
  return (
    <div className={'flex flex-col min-h-screen'}>
      <Head>
        <title>DeFiChain V2 Explorer</title>
        <meta name='description' content='DeFiChain V2 Explorer' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />

      <main className={'flex-grow'}>
        {props.children}
      </main>

      <Footer />
    </div>
  )
}
