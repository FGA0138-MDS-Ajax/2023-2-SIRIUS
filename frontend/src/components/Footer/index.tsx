import { Link } from 'react-router-dom'
import LogoFooter from '../LogoFooter'

const Footer = () => {

  const renderFooterNavs = () => {
    const navItems = [
      { title: 'Sobre', route: '/design' },
      { title: 'Time', route: '/branding' },
      { title: 'Stack', route: '/development' },
      { title: 'Contato', route: '/about' },
    ]

    return (
      <ul className="text-gray-200 text-xl lg:text-2xl md:text-3xl">
        {navItems.map((item) => (
          <li
            key={item.title}
            className="flex-col gap-y-[4px] block"
          >
            <Link to={item.route}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <footer className="py-4 pb-6 lg:pt-20 font-coolveticaLt background-footer">
      <div className="px-4 lg:px-20">
        <div className="lg:flex">
          <div className="flex-1 mb-16 lg:flex lg:items-start lg:justify-start lg:flex-col">
            <LogoFooter />
          </div>
          <div className="flex flex-col">
            <div className="grid grid-cols-2 gap-24">
              <div className="pb-12">
                {renderFooterNavs()}
              </div>
              <div className="pb-12">
                {renderFooterNavs()}
              </div>
            </div>
          </div>
        </div>
        <div className="text-gray-300 md:text-xl flex items-center flex-col mt-12 md:flex-row md:justify-between lg:flex-row lg:justify-between">
          <div className="flex">
            <Link to="/privacy">
              Politica de Privacidade
            </Link>
            <span>/</span>
            <Link to="/terms">
              Termos
            </Link>
          </div>
          <p>©2023 Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
