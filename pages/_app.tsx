import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AppStateProvider } from '../hooks';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppStateProvider>
      <Component {...pageProps} />
    </AppStateProvider>
  )
}

export default MyApp
