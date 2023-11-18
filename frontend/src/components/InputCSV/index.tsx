/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { API } from '../../server/api'
import BounceLoader from 'react-spinners/BounceLoader'
import { AnimatePresence, motion } from 'framer-motion'

const InputCSV = () => {
  const [fileContents, setFileContents] = useState<string>('')
  const [validInput, setValidInput] = useState<boolean>(false)
  const [jsonData, setJsonData] = useState<any | null>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>()
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null)

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
      setSelectedFileName(null) // Limpa o nome do arquivo se não for válido
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
    setSelectedFileName(file.name) // Atualiza o nome do arquivo
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
  
      // Adicionando um timeout de 2 segundos (2000 milissegundos) para simular o carregamento
      setTimeout(async () => {
        const response = await API.post('/csv', { ...json })
  
        if (response.data && response.data.res !== 'erro') {
          setJsonData(response.data)
        } else {
          setError('Erro no processamento do CSV.')
        }
  
        setLoading(false)
      }, 2000)
    } catch (error) {
      setError('Erro na requisição para processar o CSV: ' + (error as string))
      setLoading(false)
    }
  }

  const handleNewUpload = () => {
    setFileContents('')
    setValidInput(false)
    setJsonData(null)
    setError(null)
    setSelectedFileName(null) // Limpa o nome do arquivo
  }

  return (
    <section className="md:py-[6rem] pt-12 pb-8">
      <div className="flex flex-col items-center gap-12">
        <h1 className='text-gray-200 lg:text-6xl md:text-4xl text-2xl text-center font-caustenBd'>Importação de Arquivos CSV para Chaveamento.</h1>
        <div className="flex items-center justify-center w-full max-w-7xl">
          <AnimatePresence>
            {!jsonData && (
              <motion.label
                key="label"
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 duration-300 ease"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Clique para importar</span> ou arraste e solte.</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{selectedFileName ? `Arquivo Selecionado: ${selectedFileName}` : 'CSV'}</p>
                </div>
                <input 
                  id="dropzone-file" 
                  type="file" 
                  accept=".csv"
                  className='hidden'
                  onChange={handleFileChange} 
                />
              </motion.label>
            )}
          </AnimatePresence>
        </div>
        <AnimatePresence>
          {!jsonData && (
            <motion.button
              key="button"
              type="button"
              onClick={handleSubmit}
              className="inline-block lg:py-4 lg:px-12 md:py-4 md:px-12 py-2 px-10 bg-gradient rounded-full text-lg text-white text-center font-caustenBd shadow-lg hover:scale-110 duration-300 ease-in-out"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              Upload
            </motion.button>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {jsonData && (
            <motion.button
              key="newUploadButton"
              type="button"
              onClick={handleNewUpload}
              className="-mt-12 inline-block lg:py-4 lg:px-12 md:py-4 md:px-12 py-2 px-10 bg-gradient rounded-full text-lg text-white text-center font-caustenBd shadow-lg hover:scale-110 duration-300 ease-in-out"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              Fazer Novo Upload
            </motion.button>
          )}
        </AnimatePresence>
        <div className='flex flex-col items-start justify-center text-gray-200'>
          <div className='flex items-center justify-center'>
            {loading && (
              <div className="flex items-center">
                <BounceLoader 
                  color={'#344981'}
                  loading={loading}
                  size={70}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
                <p className='text-gray-200 text-2xl ml-4 font-caustenBd'>Carregando Dados...</p>
              </div>
            )}
          </div>
          {error && <p className="text-red-500 mt-2 text-center font-bold text-xl">Erro: {error}</p>}
          {jsonData && (
            <div className='flex flex-col items-center justify-center'>
              <h2 className='text-2xl text-center font-caustenBd mb-4'>Arquivo CSV Transformado para JSON:</h2>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-lg text-left rtl:text-right text-gray-500 dark:text-gray-200 shadow-xl">
                  <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-[#2D2D2F] dark:text-gray-300">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                      Game Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                      Discord ID
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {jsonData.map((item: any, index: number) => (
                      <tr key={index} className="odd:bg-white odd:dark:bg-[#344981] even:bg-gray-50 even:dark:bg-[#2D2D2F] border-b dark:border-gray-700">
                        <td className="px-6 py-4">{item.inGameName}</td>
                        <td className="px-6 py-4">{item.discordID}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default InputCSV
