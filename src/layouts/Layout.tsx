import { ReactNode } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface LayoutProps {
  children: ReactNode
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
