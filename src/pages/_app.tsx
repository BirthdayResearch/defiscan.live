import NextNProgress from 'nextjs-progressbar'
import { Default } from '../layouts/Default'
import '../styles/globals.css'

function ScanApp ({ Component, pageProps }: any): JSX.Element {
  return (
    <Default>
      <NextNProgress color='#ff00af' height={2} />
      <Component {...pageProps} />
    </Default>
  )
}

export default ScanApp
