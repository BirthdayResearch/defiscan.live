import '../styles/globals.css'
import App, { AppContext } from 'next/app'
import { Default } from '../layouts/Default'

function ScanApp ({ Component, pageProps }): JSX.Element {
  return (
    <Default>
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
