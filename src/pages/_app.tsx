import '../styles/globals.css'
import Default from "../layouts/Default";

function App ({ Component, pageProps }): JSX.Element {
  return (
    <Default>
      <Component {...pageProps} />
    </Default>
  )
}

export default App
