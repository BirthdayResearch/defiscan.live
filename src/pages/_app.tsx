import App, { AppContext } from 'next/app'
import NextNProgress from 'nextjs-progressbar'
import { Default } from '../layouts/Default'
import '../styles/globals.css'

function ScanApp ({ Component, pageProps }): JSX.Element {
  return (
    <Default>
      <NextNProgress color='#ff00af' height={2} />
      <Component {...pageProps} />
    </Default>
  )
}

/**
 * To load SSR for hydrating
 */
ScanApp.getInitialProps = async (ctx: AppContext) => {
  const appProps = await App.getInitialProps(ctx)
  return { ...appProps }
}

export default ScanApp
