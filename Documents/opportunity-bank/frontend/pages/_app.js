import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import Layout from '../Layout'
import * as React from 'react'
import { AuthProvider } from '../auth-context'
import Head from 'next/head'
import { NotificationProvider } from '../notification-context'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Banco de las oportunidades - Alcaldía de Medellín</title>
      </Head>
      <AuthProvider>
        <NotificationProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </NotificationProvider>
      </AuthProvider>
    </>
  )
}

export default MyApp
