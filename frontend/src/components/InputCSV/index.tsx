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
    <div className="flex flex-col items-center justify-center my-10">
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
      />
      <button
        type="button"
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Upload
      </button>
      {loading && <p>Carregando...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {jsonData && (
        <div>
          <h2>Transformed JSON Data:</h2>
          <pre>{JSON.stringify(jsonData, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

export default InputCSV
