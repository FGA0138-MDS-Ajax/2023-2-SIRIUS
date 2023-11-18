import { Link } from 'react-router-dom'

const Hero = () => (
  <section className="lg:py-[11rem] pt-12 pb-8">
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-8">
      <div className="grid grid-cols-1 lg:flex lg:items-center lg:justify-between lg:gap-12">
        <div className="flex flex-col justify-center px-4 space-y-8 sm:px-0 md:mt-0 lg:max-w-full lg:justify-center text-left lg:text-left">
          <h1 className="text-gray-200 lg:text-[4.5rem] lg:leading-[4.5rem] lg:tracking-tighter md:text-6xl font-caustenBd text-5xl">
            Preparado para mais um torneio ?
          </h1>
          <p className="text-gray-400 text-lg sm:text-lg md:text-2xl font-caustenRg">
          Monte agora mesmo o chaveamento do seu torneio e tenha acesso a uma plataforma completa para gerenciar seus eventos.
          </p>
          <div className="lg:justify-between lg:items-center lg:flex lg:flex-row md:justify-between md:items-center md:flex md:flex-row text-lg md:max-w-md flex items-center flex-col gap-4">
            <Link to={'/csvuploader'} className="inline-block lg:py-4 lg:px-12 md:py-6 md:px-12 md:text-2xl py-4 px-10 bg-gradient rounded-full text-lg text-white text-center font-caustenBd shadow-lg hover:scale-110 duration-300 ease-in-out">Montar Chave</Link>
          </div>
        </div>
        <div className="flex items-center justify-center mt-20 lg:my-0 lg:w-full">
          <img
            src="./public/images/uncharted-realms-splash.webp"
            width={1000}
            height={1000}
            alt="Imagem de um homem com um notebook"
            className='rounded-xl'
          />
        </div>
      </div>
    </div>
  </section>
)

export default Hero
