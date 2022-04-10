import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AppStateProvider } from '../hooks';
import { AlertProvider } from '../hooks/useAlert.hook';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppStateProvider>
      <AlertProvider>
        <Component {...pageProps} />
      </AlertProvider>
    </AppStateProvider>
  )
}

export default MyApp
