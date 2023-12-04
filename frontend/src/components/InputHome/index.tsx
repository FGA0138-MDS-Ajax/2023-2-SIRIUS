/* eslint-disable @typescript-eslint/no-explicit-any */
import { Swords } from 'lucide-react'
import { useState } from 'react'
import { API } from '../../server/api'
import { IFormSearchGrupoData } from './type'

const InputHome = () => {
  const [formData, setFormData] = useState<IFormSearchGrupoData>({
    inGameName: '',
    numeroRodada: '',
    nomeTorneio: ''
  })
  const [loading, setLoading] = useState(false)

  const EnumRodada = [
    'UM',
    'DOIS',
    'TRES',
    'SEMIFINAL',
    'FINAL',
  ]

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault() // Evita o comportamento padrão de enviar o formulário

      const { data } = await API.post('/participantesEmGrupo/search', formData)

      if (data) {
        console.log('Grupo encontrado', data)
        setFormData(data)
      }
    } catch {
      console.log('Erro ao encontrar grupo')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }


  return (
    <div className="flex items-center justify-center lg:pb-[14rem] md:pb-[10rem] pb-8 ">
      <form onSubmit={onSubmit} className="flex flex-col gap-y-8 md:flex-row md:gap-x-6 lg:flex-row lg:gap-x-8 font-caustenBd">
        <div className="flex flex-col">
          <label htmlFor="inGameName" className="text-gray-200 mb-6 text-2xl">
            Nome
          </label>
          <input
            type="text"
            name="inGameName"
            id="inGameName"
            value={formData.inGameName}
            onChange={handleChange}
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
            name="nomeTorneio"
            id="torneio"
            value={formData.nomeTorneio}
            onChange={handleChange}
            placeholder="Digite o nome do Torneio"
            className="px-4 h-14 w-80 rounded-lg input text-white lg:text-xl text-lg md:texl-lg outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="rodadas" className="text-gray-200 mb-6 text-2xl">Rodada</label>
          <select
            id="rodadas"
            name="numeroRodada"
            value={formData.numeroRodada}
            onChange={handleChange}
            className="px-4 h-14 w-80 rounded-lg input text-white lg:text-xl text-lg md:texl-lg outline-none"
          >
            <option value="">Selecione a Rodada</option>
            {EnumRodada.map((numeroRodada, index) => (
              <option key={index} value={numeroRodada}>{numeroRodada}</option>
            ))}
          </select>
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
