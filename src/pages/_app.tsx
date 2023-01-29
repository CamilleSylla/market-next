import SnackBar from '@/components/SnackBar/SnackBar'
import SnackBarProvider from '@/context/SnackBarContext'
import UserContextProvider from '@/context/UserContext'
import DefaultLayout from '@/layouts/default'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {

  return (
    <UserContextProvider>
      <SnackBarProvider>
        <SnackBar>
          <DefaultLayout>
            <Component {...pageProps} />
          </DefaultLayout>
        </SnackBar>
      </SnackBarProvider>
    </UserContextProvider>
  )
}
