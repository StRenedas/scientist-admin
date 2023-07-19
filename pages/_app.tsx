import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/layouts'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
