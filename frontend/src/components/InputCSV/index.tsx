/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { API } from '../../server/api'
import GroupButton from '../GroupButton'
import BounceLoader from 'react-spinners/BounceLoader'
import { AnimatePresence, motion } from 'framer-motion'
import NewUploadButton from '../NewUploadButton'
import SubmitButton from '../SubmitButton'
import ParticipantsTable from '../ParticipantsTable'

const InputCSV = () => {
  const [fileContents, setFileContents] = useState<string>('')
  const [validInput, setValidInput] = useState<boolean>(false)
  const [dataJSON, setdataJSON] = useState<any | null>()
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

      const response = await API.post('/csv', { ...json })

      if (response.data && response.data.res !== 'erro') {
        setdataJSON(response.data)
      } else {
        setError('Erro no processamento do CSV.')
      }

      setLoading(false)
    } catch (error) {
      setError('Erro na requisição para processar o CSV: ' + (error as string))
      setLoading(false)
    }
  }

  const handleNewUpload = () => {
    setFileContents('')
    setValidInput(false)
    setdataJSON(null)
    setError(null)
    setSelectedFileName(null) // Limpa o nome do arquivo
  }

  return (
    <section className="md:py-[6rem] pt-12 pb-8">
      <div className="flex flex-col items-center gap-12">
        <h1 className='text-gray-200 lg:text-6xl md:text-4xl text-2xl text-center font-caustenBd'>Importação de Arquivos CSV para Chaveamento.</h1>
        <div className="flex items-center justify-center w-full max-w-7xl">
          <AnimatePresence>
            {!dataJSON && (
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
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
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
          {!dataJSON && (
            <SubmitButton handleSubmit={handleSubmit} />
          )}
        </AnimatePresence>
        <div className='flex gap-4'>
          <AnimatePresence>
            {dataJSON && (
              <NewUploadButton handleNewUpload={handleNewUpload} />
            )}
          </AnimatePresence>
          <AnimatePresence>
            {dataJSON && (
              <GroupButton dadosJson={dataJSON} />
            )}
          </AnimatePresence>
        </div>
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
          {dataJSON && (
            <ParticipantsTable dadosJSON={dataJSON} />
          )}
        </div>
      </div>
    </section>
  )
}

export default InputCSV
