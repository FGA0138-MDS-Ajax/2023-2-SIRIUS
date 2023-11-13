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
    <section className="md:py-[10rem] pt-32 pb-8">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:flex lg:items-center lg:justify-between lg:gap-12">
          <div className="flex items-center justify-center mt-20 lg:my-0 lg:w-full">
            <div className="flex flex-col items-center justify-center my-10">
              <label className='text-xl'>Importar arquivo <span>.csv</span></label>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className=''
              />
              <button
                type="button"
                onClick={handleSubmit}
                className="inline-block lg:py-4 lg:px-12 md:py-4 md:px-12 py-2 px-10 bg-gradient rounded-full text-lg text-white text-center font-caustenBd shadow-lg hover:scale-110 duration-300 ease-in-out"
              >
              Upload
              </button>
            </div>
            <div>
              {loading && <p>Carregando...</p>}
              {error && <p className="text-red-500">{error}</p>}
              {jsonData && (
                <div>
                  <h2>Arquivo CSV Transformado para JSON:</h2>
                  <pre>{JSON.stringify(jsonData, null, 2)}</pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
    </section>
  )
}

export default InputCSV
