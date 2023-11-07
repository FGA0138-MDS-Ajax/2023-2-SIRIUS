import { useState } from 'react'
import { API } from '../../server/api'

const Input = () => {
  const [fileContents, setFileContents] = useState<string>('')
  const [validInput, setValidInput] = useState<boolean>(false)
  const [jsonData, setJsonData] = useState()

  const fileIsValid = (file?: File) => {
    return file && file.type === 'text/csv'
  }

  const handleFileChange = (event: any) => {
    const file = event.target.files[0]

    // verificar se o arquivo inserido é csv. Caso
    // contrário, limpar o input
    if(!fileIsValid(file)) {
      console.error('Selecione um arquivo csv!')
      event.target.value = null
      setFileContents('')
      setValidInput(false)
      return
    }

    setValidInput(true)

    // usar o FileReader para obter o conteúdo do csv, em string,
    // e alocar na variável fileContents
    const reader = new FileReader()
    reader.onload = r => {
      const conteudoCsv = r.target?.result as string
      setFileContents(conteudoCsv)
    }

    reader.readAsText(file)
  }

  const handleSubmit = async () => {
    // a validação abaixo é necessária, pois o usuário pode enviar qualquer outro
    // tipo de arquivo.
    if(!validInput || fileContents === '') {
      console.error('Nenhum arquivo CSV selecionado.')
      return
    }

    try {
      const json = {fileContents: fileContents}
      const response = await API.post('/csv', {...json})
      if (response.data && response.data.res !== 'erro') 
        setJsonData(response.data)
      else
        console.error('Erro no processamento do CSV.')
      
    } catch (error) {
      console.error('Erro na requisição para processar o CSV:', error)
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
      {jsonData && (
        <div>
          <h2>Transformed JSON Data:</h2>
          <pre>{JSON.stringify(jsonData, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

export default Input
