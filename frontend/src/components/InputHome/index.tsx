import { Swords } from 'lucide-react'
import { useState } from 'react'
import { API } from '../../server/api'

const InputHome = () => {
  const [formData, setFormData] = useState({
    inGameName: '',
    torneio: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Utilize o Axios para enviar a solicitação POST
      const response = await API.post('/participantesEmGrupo/search', formData)

      if (response.status === 200) {
        console.log('Dados enviados com sucesso!', response.data)
      } else {
        console.error('Erro ao enviar dados para o backend')
      }
    } catch (error) {
      console.error('Erro ao enviar dados para o backend:', error)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  return (
    <div className="flex items-center justify-center lg:pb-[14rem] md:pb-[10rem] pb-8 ">
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-8 md:flex-row md:gap-x-6 lg:flex-row lg:gap-x-8 font-caustenBd">
        <div className="flex flex-col">
          <label htmlFor="inGameName" className="text-gray-200 mb-6 text-2xl">
            Nome
          </label>
          <input
            type="text"
            name="inGameName"
            id="inGameName"
            value={formData.inGameName}
            onChange={handleInputChange}
            placeholder="Digite o seu Game Name"
            className="px-4 h-14 w-96 rounded-lg input text-white text-lg"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="torneio" className="text-gray-200 mb-6 text-2xl">
            Torneio
          </label>
          <input
            type="text"
            name="torneio"
            id="torneio"
            value={formData.torneio}
            onChange={handleInputChange}
            placeholder="Digite o nome do Torneio"
            className="px-4 h-14 w-80 rounded-lg input text-white lg:text-xl text-lg md:texl-lg outline-none"
          />
        </div>
        <div className="flex items-end justify-center">
          <button
            type="submit"
            className="btn-gradient2 py-4 px-4 rounded-3xl hover:scale-105 duration-300 ease-in-out"
          >
            <Swords size={30} strokeWidth={1.5} />
          </button>
        </div>
      </form>
    </div>
  )
}

export default InputHome
