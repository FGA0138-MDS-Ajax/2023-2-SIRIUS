/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { API } from '../../server/api'

const InputCSV = () => {
  const [fileContents, setFileContents] = useState<string>('')
  const [validInput, setValidInput] = useState<boolean>(false)
  const [jsonData, setJsonData] = useState<any | null>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>()

  const fileIsValid = (file?: File) => {
    return file && file.type === 'text/csv'
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file || !fileIsValid(file)) {
      setError('Selecione um arquivo CSV válido.')
      event.target.value = ''
      setFileContents('')
      setValidInput(false)
      return
    }

    setValidInput(true)
    setError(null)

    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      setFileContents(content)
    }

    reader.readAsText(file)
  }

  const handleSubmit = async () => {
    if (!validInput || fileContents === '') {
      setError('Nenhum arquivo CSV selecionado.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const json = { fileContents }
      const response = await API.post('/csv', { ...json })

      if (response.data && response.data.res !== 'erro') {
        setJsonData(response.data)
      } else {
        setError('Erro no processamento do CSV.')
      }
    } catch (error) {
      setError('Erro na requisição para processar o CSV: ' + (error as string))

    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="md:py-[6rem] pt-32 pb-8">
      <div className="flex flex-col items-center gap-12">
        <h1 className='text-gray-200 text-3xl'>Importação de Arquivos CSV para Chaveamento.</h1>
        <div className="flex items-center justify-center w-full max-w-7xl">
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 duration-300 ease">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Clique para importar</span> ou arraste e solte.</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">CSV</p>
            </div>
            <input 
              id="dropzone-file" 
              type="file" 
              accept=".csv"
              onChange={handleFileChange} />
          </label>
        </div> 
        <button
          type="button"
          onClick={handleSubmit}
          className="inline-block lg:py-4 lg:px-12 md:py-4 md:px-12 py-2 px-10 bg-gradient rounded-full text-lg text-white text-center font-caustenBd shadow-lg hover:scale-110 duration-300 ease-in-out"
        >
              Upload
        </button>
        <div className='flex flex-col items-start justify-center text-gray-200'>
          {loading && <p className='text-white text-xl'>Carregando...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {jsonData && (
            <div className='flex flex-col items-center justify-center'>
              <h2 className='text-2xl font-caustenBd'>Arquivo CSV Transformado para JSON:</h2>
              <pre className='font-caustenBd'>{JSON.stringify(jsonData, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default InputCSV
