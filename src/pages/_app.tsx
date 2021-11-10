import { initializeStore, RootState } from '@store/index'
import { GetServerSidePropsResult } from 'next'
import NextNProgress from 'nextjs-progressbar'
import { Default } from '../layouts/Default'
import '../styles/globals.css'

export interface ScanAppProps {
  initialReduxState: RootState
}

export default function ScanApp ({
  Component,
  pageProps
}): JSX.Element {
  return (
    <Default {...pageProps}>
      <NextNProgress color='#FFE5F7' height={2} options={{ showSpinner: false }} />
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
