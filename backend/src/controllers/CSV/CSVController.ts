/* eslint-disable @typescript-eslint/no-unused-vars */

import { Request, Response } from 'express';
import fs from 'fs';
import { parse } from 'csv-parse';

export class CSVController {
  async importCSV(req: Request, res: Response) {
    const filePath = req.file?.path;
    if(!filePath) return res.status(400).send('erro');

    const data = fs.readFileSync(filePath);

    try {
        parse(data, (err, records) => {
            if(err) {
                console.log('erro ao ler dados');
                return res.status(400).json({res: 'erro'});
            } 

            const chaves = records.shift();
            const jsonRetorno = [];

            for(let i = 0; i < chaves.length; i++) {
                if(chaves[i].includes('ID Discord')) chaves[i] = 'discordID';
                if(chaves[i].includes('Email')) chaves[i] = 'email';
            }

            for(let linha of records) {
                const dados:any = {};
                for(let i = 0; i < linha.length; i++) {
                    dados[chaves[i]] = linha[i];
                }
                jsonRetorno.push(dados);
            }

            return res.json(jsonRetorno);
        }); 
    } catch(e) {
        return res.status(400).send('erro');
    }
  }
}
