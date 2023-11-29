import { Request, Response } from 'express'

/**
 * Classe Para Controle do Métodos Controlador do CSV.
 */
export default class CSVController {
  /**
   * Método para Trabalhar o Arquivo .CSV e retornar um JSON para o FrontEnd.
   */
  async importCSV(req: Request, res: Response) {
    try {
      const { fileContents } = req.body
      if (!fileContents) {
        return res.status(400).send('CSV Vazio')
      }

      const csvContents = this.parseCSV(fileContents)
    
      if (!csvContents) {
        return res.status(400).send('CSV Inválido')
      }

      const arrord = this.fillArray(csvContents)
      const csvRandom = this.arrayToCSV(arrord)
      const chaves = this.extractKeys(csvRandom)
      const jsonRetorno = this.generateJSONData(csvRandom, chaves)

      
      return res.json(jsonRetorno)
    } catch (error) {
      return res.status(500).send('Erro no Processamento do CSV: ' + (error as string))
    }
  }

  public parseCSV(fileContents: string): string[] | null {
    try {
      return fileContents.replaceAll('"', '').split('\n')
    } catch (error) {
      return null
    }
  }

  public extractKeys(csvContents: string[]): string[] {
    if (csvContents.length > 0) {
      return csvContents.shift()!.split(',').map((chave: string) => {
        if (chave.includes('ID Discord')) return 'discordID'
        if (chave.includes('Email')) return 'email'
        return chave
      })
    }
    return []
  }

  public fillArray(csvContents: string[]){
    const arrayord: string[][] = []
    csvContents.forEach((linha) =>{
      const colunas = linha.split(',')
      arrayord.push(colunas)    
    })
    this.shuffleArray(arrayord)
    return arrayord
  }

  public shuffleArray(inputArray: string[][]) {
    inputArray.sort(() => Math.random() - 0.5)
  } 
  public arrayToCSV(array: string[][]) {
    const csvRows = []
    this.moveSubarrayToFirstPosition(array,['teamName','inGameName','checkedInAt','userID','ID Discord (Exemplo#1234)','Email de Contato'])
    for (const row of array) {
      const csvRow = row.map(value => `${value}`).join(',')
      csvRows.push(csvRow)
    }
    return csvRows
  }

  public moveSubarrayToFirstPosition(array: string[][], subarrayToMove: string[]) {
    const index = array.findIndex(subarray => {
      return subarray.every((value, i) => value === subarrayToMove[i])
    })
    if (index > -1) {
      const removedSubarray = array.splice(index, 1)[0]
      array.unshift(removedSubarray)
    }
    return array
  }

  public generateJSONData(csvContents: string[], chaves: string[]): { [key: string]: string }[] {
    return csvContents.map((linha: string) => {
      const valores = linha.split(',')
      const dados: { [key: string]: string } = {}
      chaves.forEach((chave: string, i: number) => {
        dados[chave] = valores[i]
      })
      return dados
    })
  } 


}
