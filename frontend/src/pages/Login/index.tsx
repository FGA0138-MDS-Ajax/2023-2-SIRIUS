import { Link } from 'react-router-dom'
import Logo from '../../components/Logo'

const Login = () => {
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4 lg:-mt-12">
      <div className="max-w-md w-full text-gray-600">
        <div className="text-center">
          <div className='flex items-center justify-center'>
            <Logo />
          </div>
          <div className="mt-6 space-y-4">
            <h3 className="text-gray-200 text-4xl font-bold sm:text-5xl">Faça login na sua Conta!</h3>
            <p className="text-gray-400 text-lg">Não possui uma conta? <Link to="/suporte" className="font-medium text-xl gradientText">Falar com Suporte</Link></p>
          </div>
        </div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-10 space-y-6"
        >
          <div>
            <label className="text-gray-200 mb-4 text-xl">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full mt-2 px-5 py-4 text-gray-500 inputLogin outline-none shadow-sm rounded-lg"
              placeholder='Digite seu email'
            />
          </div>
          <div>
            <label className="text-gray-200 mb-4 text-xl">
              Senha
            </label>
            <input
              type="password"
              required
              className="w-full my-2 px-5 py-4 text-gray-500 inputLogin outline-none shadow-sm rounded-lg"
              placeholder='Digite sua senha'
            />
          </div>
          <button className="w-full px-6 py-4 text-gray-200 btn-gradient2 rounded-3xl hover:scale-105 duration-300 ease-in-out">
            Entrar
          </button>
          <div className="text-center">
            <Link to="/suporte" className="text-lg gradientText">Esqueceu a Senha?</Link>
          </div>
        </form>
      </div>
    </main>
  )
}

export default Login
