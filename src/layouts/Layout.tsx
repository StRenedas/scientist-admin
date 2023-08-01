import { ReactNode } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import {
  Box,
  createTheme,
  CssBaseline,
  Divider,
  ThemeProvider,
} from '@mui/material'
import { useAppSelector } from '@/store/hooks'

interface LayoutProps {
  children: ReactNode
}
const Layout = ({ children }: LayoutProps) => {
  const theme = useAppSelector((state) => state.theme)

  const darkTheme = createTheme({
    palette: { mode: theme.isDark ? 'dark' : 'light' },
  })

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ maxWidth: '1440px', margin: '0 auto' }}>
        <Header />
        <Divider />
        <Box p={'20px'}>{children}</Box>
        <Divider />
        <Footer />
      </Box>
    </ThemeProvider>
  )
}

export default Layout
