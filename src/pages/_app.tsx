import { initializeStore, RootState } from '@store/index'
import { GetServerSidePropsResult } from 'next'
import NextNProgress from 'nextjs-progressbar'
import { Default } from '../layouts/Default'
import '../styles/globals.css'

export interface ScanAppProps {
  initialReduxState: RootState
}

export default function ScanApp ({ Component, pageProps }): JSX.Element {
  return (
    <Default {...pageProps}>
      <NextNProgress color='#ff00af' height={2} />
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
