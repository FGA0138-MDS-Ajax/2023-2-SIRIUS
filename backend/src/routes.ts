import { Router } from 'express'
import { UserController } from './controllers/Users/UsersController'
import CSVController from './controllers/CSV/CSVController'
import { TorneioController } from './controllers/Torneio/TorneioController'
import { RodadaController } from './controllers/Rodadas/RodadaController'
import { GrupoController } from './controllers/Grupos/GrupoController'
import { ParticipantesController } from './controllers/Participantes/ParticipantesController'

const routes = Router()

routes.get('/', (req, res) => {
  res.send('Hello World! Você está na raiz da API!')
})

routes.post('/csv', (req, res) => {
  const csvController = new CSVController()
  return csvController.importCSV(req,res)
})

routes.get('/grupos/quantidade/:Num_checkin', (req, res) => {
  const grupoController = new GrupoController()
  return grupoController.calcularQuantidadeGruposHandler(req, res)
})

routes.post('/torneios/create', new TorneioController().create)
routes.post('/rodadas/create', new RodadaController().create)
routes.post('/grupos/create', new GrupoController().create)
routes.post('/participantes/create', new ParticipantesController().createVariosParticipantes)

routes.post('/users/create', new UserController().create)
routes.post('/login', new UserController().login)
routes.get('/profile', new UserController().getProfile)

export { routes }
