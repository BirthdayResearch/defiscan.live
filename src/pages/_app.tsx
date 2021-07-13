import '../styles/globals.css'
import App, { AppContext } from "next/app";
import Default from "../layouts/Default";

function ExplorerApp ({ Component, pageProps }): JSX.Element {
  return (
    <Default>
      <Component {...pageProps} />
    </Default>
  )
}

/**
 * To load SSR for hydrating
 */
ExplorerApp.getInitialProps = async (ctx: AppContext) => {
  const appProps = await App.getInitialProps(ctx)
  return { ...appProps }
}

export default ExplorerApp
