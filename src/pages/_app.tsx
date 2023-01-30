import SnackBar from '@/components/SnackBar/SnackBar'
import CookiesContextProvider from '@/context/CookiesContext'
import SnackBarProvider from '@/context/SnackBarContext'
import UserContextProvider from '@/context/UserContext'
import DefaultLayout from '@/layouts/default'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import Cookies from "universal-cookie";
import axios from "axios"

export default function App({ Component, pageProps }: AppProps) {

  const [refreshUser, setRefreshUser] = useState(null)
  useEffect(() => {
    const refreshToken = new Cookies().get('refresh_token');
    if (refreshToken) {
      (async () => {
        try {
          const res = await axios.get(`${process.env.BFF_BASE || 'http://localhost:3000'}/auth/refresh`, {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          });
          setRefreshUser(res.data)
        } catch (error) {
          console.error("Cannot refresh token");
        }
      })();
    }
  }, []);

  return (
    <CookiesContextProvider>
      <UserContextProvider refresh={refreshUser}>
        <SnackBarProvider>
          <SnackBar>
            <DefaultLayout>
              <Component {...pageProps} />
            </DefaultLayout>
          </SnackBar>
        </SnackBarProvider>
      </UserContextProvider>
    </CookiesContextProvider>
  )
}