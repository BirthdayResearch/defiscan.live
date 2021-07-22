import Head from 'next/head'
import { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { store } from '../store'
import Footer from './components/Footer'
import Header from './components/Header'
import { KeepNetworkQueryString } from './contexts/api/NetworkQuery'
import { NetworkProvider } from './contexts/NetworkContext'
import { PlaygroundProvider } from './contexts/PlaygroundContext'
import { WhaleProvider } from './contexts/WhaleContext'

/**
 * Default Layout with <Head> providing default Metadata for SEO
 *
 * Wrapped in <NetworkProvider> intercept network params from querystring.
 * Followed by <PlaygroundProvider> to automatically swatch between local and remote playground for debug environment.
 * Finally with <WhaleProvider> to provide WhaleContext for accessing of WhaleAPI and WhaleRPC.
 */
export default function Default (props: PropsWithChildren<any>): JSX.Element | null {
  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>DeFiChain Explorer 2.0</title>
        <meta
          name='description'
          content='DeFi Blockchain, enabling decentralized finance with Bitcoin-grade security, strength and immutability. A blockchain dedicated to fast, intelligent and transparent financial services, accessible by everyone.'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <NetworkProvider>
        <PlaygroundProvider>
          <WhaleProvider>
            <Provider store={store}>
              <KeepNetworkQueryString>
                <Header />

                <main className='flex-grow'>
                  {props.children}
                </main>

                <Footer />
              </KeepNetworkQueryString>
            </Provider>
          </WhaleProvider>
        </PlaygroundProvider>
      </NetworkProvider>
    </div>
  )
}
