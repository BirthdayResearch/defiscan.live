import { initializeStore, RootState } from '@store/index'
import { GetServerSidePropsResult } from 'next'
import NextNProgress from 'nextjs-progressbar'
import { Default } from '../layouts/Default'
import '../styles/globals.css'
import React from 'react'

export interface ScanAppProps {
  initialReduxState: RootState
}

export default function ScanApp ({
  Component,
  pageProps
}): JSX.Element {
  return (
    <Default {...pageProps}>
      <NextNProgress color='#FF66CF' height={4} options={{ showSpinner: false }} />
      <Component {...pageProps} />
    </Default>
  )
}

export function getServerSideProps (): GetServerSidePropsResult<ScanAppProps> {
  const store = initializeStore()
  return {
    props: {
      initialReduxState: store.getState()
    }
  }
}
