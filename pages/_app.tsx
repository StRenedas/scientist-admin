import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/layouts'
import { Roboto } from 'next/font/google'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { Provider } from 'react-redux'
import { store } from '@/store/store'

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] })
const darkTheme = createTheme({
  palette: { mode: 'dark' },
})
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <style jsx global>{`
          html {
            font-family: ${roboto.style.fontFamily};
          }
        `}</style>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  )
}
