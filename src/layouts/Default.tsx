/* eslint-disable no-restricted-imports */
import { NetworkProvider } from '@contexts/NetworkContext'
import { StoreProvider } from '@contexts/StoreProvider'
import { WhaleProvider } from '@contexts/WhaleContext'
import { StatsProvider } from '@store/stats'
import Head from 'next/head'
import { PropsWithChildren } from 'react'
import { ScanAppProps } from '../pages/_app.page'
import { Footer } from './components/Footer'
import { Header } from './components/Header'

const title = 'DeFi Scan – Native Decentralized Finance for Bitcoin'
const description = 'DeFi Blockchain, enabling decentralized finance with Bitcoin-grade security, strength and immutability. A blockchain dedicated to fast, intelligent and transparent financial services, accessible by everyone.'

/**
 * Default Layout with <Head> providing default Metadata for SEO
 *
 * Wrapped in <NetworkProvider> intercept network params from querystring.
 * Followed by <PlaygroundProvider> to automatically swatch between local and remote playground for debug environment.
 * Finally with <WhaleProvider> to provide WhaleContext for accessing of WhaleAPI and WhaleRPC.
 */
export function Default (props: PropsWithChildren<ScanAppProps>): JSX.Element | null {
  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <meta charSet='UTF-8' />

        <title key='title'>{title}</title>
        <meta key='description' name='description' content={description} />
        <meta key='robots' name='robots' content='follow,index' />
        <meta key='viewport' name='viewport' content='user-scalable=no, width=device-width, initial-scale=1' />
        <meta key='apple-mobile-web-app-capable' name='apple-mobile-web-app-capable' content='yes' />

        <meta key='og:locale' name='og:locale' content='en_US' />
        <meta key='og:title' name='og:title' content={title} />
        <meta key='og:site_name' name='og:site_name' content={title} />
        <meta key='og:description' name='og:description' content={description} />

        <link rel='icon' href='/favicon.ico' />
        <link rel='icon' type='image/png' sizes='48x48' href='/favicon.png' />
      </Head>

      <NetworkProvider>
        <WhaleProvider>
          <StoreProvider state={props.initialReduxState}>
            <StatsProvider>
              <Header />

              <main className='flex-grow'>
                {props.children}
              </main>

              <Footer />
            </StatsProvider>
          </StoreProvider>
        </WhaleProvider>
      </NetworkProvider>
    </div>
  )
}
