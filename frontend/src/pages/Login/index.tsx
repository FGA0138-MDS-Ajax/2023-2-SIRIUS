/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../components/Logo'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { IFormData } from './type'
import { useState } from 'react'
import { API } from '../../server/api'
import Header from '../../components/Header'
import Footer from '../../components/Footer'


const Login = () => {
  const [loginNotSuccess, setLoginNotSuccess] = useState(false)

  const schema = yup.object({
    email: yup.string().email('Email inválido').required('Email obrigatório'),
    password: yup.string().min(12, 'No minimo 12 caracteres').required('Senha obrigatória'),
  }).required()

  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm<IFormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  })

  const onSubmit = async (formData: IFormData, event: any) => {
    setLoginNotSuccess(false)
    try {
      event.preventDefault() // Evita o comportamento padrão de enviar o formulário

      const { data } = await API.post('/login', formData)

      if (data) {
        console.log('Login feito com sucesso', data)

        const token = data.token
        localStorage.setItem('token', token)

        navigate('/csvUploader')

      }
    } catch {
      console.log('Erro ao fazer login')
      setLoginNotSuccess(true)
    }
  }

  const ErrorDisplayEmail = () => errors && <p className="text-red-500 mt-2 text-left font-bold text-xl">{errors.email?.message}</p>
  const ErrorDisplayLogin = () => loginNotSuccess && <p className="text-red-500 mt-2 text-left font-bold text-xl">Email ou senha incorretos</p>
  const ErrorDisplayPassword = () => errors && <p className="text-red-500 mt-1 text-left font-bold text-xl">{errors.password?.message}</p>

  return (
    <>
      <Header autenticado={false} />
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
            onSubmit={handleSubmit(onSubmit)}
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
                {...register('email')}
              />
              <ErrorDisplayEmail />
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
                {...register('password')}
              />
              <ErrorDisplayPassword />
              {loginNotSuccess && (
                <ErrorDisplayLogin />
              )}
            </div>
            <button
              className="w-full px-6 py-4 text-gray-200 btn-gradient2 rounded-3xl hover:scale-105 duration-300 ease-in-out"
              type="submit"
            >
              Entrar
            </button>
            <div className="text-center">
              <Link to="/suporte" className="text-lg gradientText">Esqueceu a Senha?</Link>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Login