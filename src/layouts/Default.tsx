import Head from "next/head";
import { PropsWithChildren } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { NetworkProvider } from "./contexts/NetworkContext";
import { PlaygroundProvider } from "./contexts/PlaygroundContext";
import { WhaleProvider } from "./contexts/WhaleContext";

/**
 * Default Layout with <Head> providing default Metadata for SEO
 *
 * Wrapped in <NetworkProvider> intercept network params from querystring.
 * Followed by <PlaygroundProvider> to automatically swatch between local and remote playground for debug environment.
 * Finally with <WhaleProvider> to provide WhaleContext for accessing of WhaleAPI and WhaleRPC.
 */
export default function Default (props: PropsWithChildren<any>): JSX.Element | null {
  return (
    <div className={'flex flex-col min-h-screen'}>
      <Head>
        <title>DeFiChain V2 Explorer</title>
        <meta name='description' content='DeFiChain V2 Explorer' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <NetworkProvider>
        <PlaygroundProvider>
          <WhaleProvider>
            <Header />

            <main className={'flex-grow'}>
              {props.children}
            </main>

            <Footer />
          </WhaleProvider>
        </PlaygroundProvider>
      </NetworkProvider>
    </div>
  )
}
