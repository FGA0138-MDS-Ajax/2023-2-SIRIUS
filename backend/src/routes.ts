import { Router } from 'express';
import { UserController } from './controllers/Users/UsersController';
import os from 'os';
import fs from 'fs';
import {parse} from 'csv-parse';
import multer from 'multer';

const upload = multer({ dest: '/temp/' });

const routes = Router()

routes.get('/', (req, res) => {
  res.send('Hello World! Você está na raiz da API!')
})

routes.post('/csv', upload.single('file'),(req, res) => {
    const data = fs.readFileSync(req.file?.path);

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
                const dados = {};
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
});

routes.post('/user', new UserController().create)
routes.post('/login', new UserController().login)
routes.get('/profile', new UserController().getProfile)

export { routes }
