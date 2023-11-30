import { Router } from 'express'
import { UserController } from './controllers/Users/UsersController'
import CSVController from './controllers/CSV/CSVController'
import { TorneioController } from './controllers/Torneio/TorneioController'
import { RodadaController } from './controllers/Rodadas/RodadaController'
import { GrupoController } from './controllers/Grupos/GrupoController'
import { ParticipantesController } from './controllers/Participantes/ParticipantesController'
import { ParticipantesTorneioController } from './controllers/ParticipantesTorneio/ParticipantesTorneioController' 

const routes = Router()

// a gente vai deixar isso assim mesmo? Hehe, sem uso apenas para teste!! :)
routes.get('/', (req, res) => {
  res.send('Hello World! Você está na raiz da API!')
})
routes.post('/csv', (req, res) => {
  const csvController = new CSVController()
  return csvController.importCSV(req,res)
})

routes.post('/torneio', new TorneioController().create)
routes.post('/torneio/rodadas', new RodadaController().mainRodadas)
routes.post('/torneio/grupos', new GrupoController().create)
routes.post('/torneio/participantes', new ParticipantesController().create)
routes.post('/torneio/participantestorneio', new ParticipantesTorneioController().create)

routes.post('/user', new UserController().create)
routes.post('/login', new UserController().login)
routes.get('/profile', new UserController().getProfile)

export { routes }