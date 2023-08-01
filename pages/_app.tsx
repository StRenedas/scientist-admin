import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/layouts'
import { Roboto } from 'next/font/google'
import { Provider } from 'react-redux'
import { store } from '@/store/store'

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <style jsx global>{`
          html {
            font-family: ${roboto.style.fontFamily};
          }
        `}</style>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}
