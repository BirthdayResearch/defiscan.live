import { initializeStore, RootState } from '@store/index'
import { GetServerSidePropsResult } from 'next'
import NextNProgress from 'nextjs-progressbar'
import { Default } from '../layouts/Default'
import '../styles/globals.css'
import { WarningBanner } from '@components/commons/banner/WarningBanner'
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
      <WarningBanner message='We are currently investigating a sync issue between the blockchain and the interface on the apps. This is only a display issue, and does not affect the balances in the wallet.' />
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
