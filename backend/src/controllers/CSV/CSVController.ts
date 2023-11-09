import { Request, Response } from 'express'

export default class CSVController {
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

      const chaves = this.extractKeys(csvContents)
      const jsonRetorno = this.generateJSONData(csvContents, chaves)

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
