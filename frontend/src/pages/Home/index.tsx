import Footer from '../../components/Footer'
import Header from '../../components/Header'
import Hero from '../../components/Hero'
import InputHome from '../../components/InputHome'

const Home = () => {
  return (<>
    <Header autenticado={false} />
      <Hero />
      <InputHome />
    <Footer />
  </>
  )
}

export default Home