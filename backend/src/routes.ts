import { Router } from 'express'
import { UserController } from './controllers/Users/UsersController'
import CSVController from './controllers/CSV/CSVController'
import { TorneioController } from './controllers/Torneio/TorneioController'
import { RodadaController } from './controllers/Rodadas/RodadaController'
import { GrupoController } from './controllers/Grupos/GrupoController'
import { ParticipantesController } from './controllers/Participantes/ParticipantesController'
import { ParticipanteEmGrupoController } from './controllers/ParticipanteEmGrupo/ParticipanteEmGrupoController'

const routes = Router()

routes.get('/', (req, res) => {
  res.send('Hello World! Você está na raiz da API!')
})

routes.post('/csv', (req, res) => {
  const csvController = new CSVController()
  return csvController.importCSV(req, res)
})

routes.get('/grupos/quantidade/:Num_checkin', (req, res) => {
  const grupoController = new GrupoController()
  return grupoController.calcularQuantidadeGruposHandler(req, res)
})

// Criar rota para fazer as 5 requisicoes de uma vez
routes.post('/torneios/create', async (req, res) => {
  const torneioController = new TorneioController()
  const nome = req.body.nome

  const newTorneio = await torneioController.create(nome)
  if (!newTorneio) {
    return res.status(400).send('Erro ao criar torneio')
  }

  return res.status(200).json(newTorneio)

})

routes.post('/torneios/search', async (req, res) => {
  const torneioController = new TorneioController()
  const nome = req.body.nome

  const torneio = await torneioController.searchByName(nome)
  if (!torneio) {
    return res.status(400).send('Erro ao buscar torneio')
  }
  return res.status(200).json(torneio)

})

routes.get('/torneios', new TorneioController().getTorneios)

routes.post('/rodadas/create', async (req, res) => {
  const rodadaController = new RodadaController()
  const torneioID = req.body.torneioID

  const newRodada = await rodadaController.create(torneioID)
  if (!newRodada) {
    return res.status(400).send('Erro ao criar rodada')
  }
  return res.status(200).json(newRodada)
})


routes.post('/grupos/create', async (req, res) => {
  const grupoController = new GrupoController()
  const rodadaID = req.body.rodadaID

  const newGrupo = await grupoController.create(rodadaID)
  if (!newGrupo) {
    return res.status(400).send('Erro ao criar grupo')
  }
  return res.status(200).json(newGrupo)
})

routes.post('/participantes/create', new ParticipantesController().createVariosParticipantes)
routes.post('/participantes/search', new ParticipantesController().searchByInGameName)
routes.get('/participantes', new ParticipantesController().getParticipantes)

routes.post('/participantesEmGrupo/create', new ParticipanteEmGrupoController().create)
routes.post('/participantesEmGrupo/search', new ParticipanteEmGrupoController().getGruposDeParticipante)

routes.post('/users/create', new UserController().create)
routes.post('/login', new UserController().login)
routes.get('/profile', new UserController().getProfile)

export { routes }

