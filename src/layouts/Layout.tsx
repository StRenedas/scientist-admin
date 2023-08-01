import { ReactNode } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Box, Divider } from '@mui/material'

interface LayoutProps {
  children: ReactNode
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <Box sx={{ maxWidth: '1440px', margin: '0 auto' }}>
      <Header />
      <Divider />
      <Box p={'20px'}>{children}</Box>
      <Divider />
      <Footer />
    </Box>
  )
}

export default Layout
