import Footer from '../Footer'
import Header from '../Header'

type LayoutProps = {
    children: React.ReactNode
}


const Layout = ({ children }: LayoutProps) => {
  return (
    <main className='bg-[#353535]'>
      <Header />
      {children} 
      <Footer />
    </main>
  )
}

export default Layout