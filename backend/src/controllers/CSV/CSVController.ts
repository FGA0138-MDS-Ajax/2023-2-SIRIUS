/* eslint-disable @typescript-eslint/no-unused-vars */

import { Request, Response } from 'express'

export class CSVController {
  async importCSV(req: Request, res: Response) {

    if(!req.body.fileContents || req.body.fileContents === '') 
        return res.status(400).send('erro: csv vazio')

    const jsonRetorno = [];

    const csvContents = req.body.fileContents.replaceAll('"', '').split('\n')
    const chaves = csvContents.shift().split(',')


    for(let i = 0; i < chaves.length; i++) {
      if(chaves[i].includes('ID Discord')) chaves[i] = 'discordID'
      if(chaves[i].includes('Email')) chaves[i] = 'email'
    }

    for(let linha of csvContents) {
      linha = linha.split(',')
      const dados: any = {}

      for(let i = 0; i < linha.length; i++) {
        dados[chaves[i]] = linha[i]
      }
      jsonRetorno.push(dados)
    }

    return res.json(jsonRetorno)
  }
}
