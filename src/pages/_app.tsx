import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';

import type { AppProps } from 'next/app'
import PageWithLayoutType from '../@types/pageWithLayout'
import { ReactElement } from 'react'
import { AuthProvider, ProtectedRoute } from '../contexts/auth'

import { ToastContainer } from 'react-toastify';
import { CartProvider } from '../contexts/cart';

type AppLayoutProps = AppProps & {
  Component: PageWithLayoutType
  pageProps: any
}
function MyApp({ Component, pageProps }: AppLayoutProps) {
  const Layout =
    Component.layout || ((children: ReactElement) => <>{children}</>)
return (
   <AuthProvider>
      <ProtectedRoute>
        <CartProvider>
          <Layout>
            <>
            <ToastContainer/>
            <Component {...pageProps} />
            </>
          </Layout>
        </CartProvider>
      </ProtectedRoute>
   </AuthProvider>
  )
}
export default MyApp
