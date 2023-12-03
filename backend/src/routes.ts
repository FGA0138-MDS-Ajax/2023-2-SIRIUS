import { Router } from 'express'
import { UserController } from './controllers/Users/UsersController'
import CSVController from './controllers/CSV/CSVController'
import { TorneioController } from './controllers/Torneio/TorneioController'
import { RodadaController } from './controllers/Rodadas/RodadaController'
import { GrupoController } from './controllers/Grupos/GrupoController'
import { ParticipantesController } from './controllers/Participantes/ParticipantesController'
import { ParticipanteEmGrupoController } from './controllers/ParticipanteEmGrupo/ParticipanteEmGrupoController'
import { VencedorGrupoController } from './controllers/VencedorGrupo/VencedorGrupoController'

const routes = Router()

routes.get('/', (req, res) => {
  res.send('Hello World! Você está na raiz da API!')
})

routes.post('/csv', (req, res) => {
  const csvController = new CSVController()
  return csvController.importCSV(req, res)
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
  const numeroRodada = req.body.numeroRodada

  const newRodada = await rodadaController.create({torneioID, numeroRodada})
  if (!newRodada) {
    return res.status(400).send('Erro ao criar rodada')
  }
  return res.status(200).json(newRodada)
})
routes.get('/rodadas', new RodadaController().getRodadas)


routes.get('/grupos/quantidade/:Num_checkin', (req, res) => {
  const grupoController = new GrupoController()
  return grupoController.calcularQuantidadeGruposHandler(req, res)
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
routes.get('/grupos', new GrupoController().getGrupos)


routes.post('/participantes/create', async (req, res) => {
  const participantesController = new ParticipantesController()
  const participantes = req.body.participantes

  const newParticipantes = await participantesController.create(participantes)
  if (!newParticipantes) {
    return res.status(400).send('Erro ao criar participantes')
  }
  return res.status(200).json(newParticipantes)
})
routes.post('/participantes/search', async (req, res) => {
  const participantesController = new ParticipantesController()
  const inGameName = req.body.inGameName

  const participante = await participantesController.searchByInGameName(inGameName)
  if (!participante) {
    return res.status(400).send('Erro ao buscar participante')
  }
  return res.status(200).json(participante)
})
routes.get('/participantes', new ParticipantesController().getParticipantes) 


routes.post('/participantesEmGrupo/create', async (req, res) => {
  const participanteEmGrupoController = new ParticipanteEmGrupoController()
  const participantesEmGrupo = req.body.participanteEmGrupo

  const newParticipantesEmGrupo = await participanteEmGrupoController.create(participantesEmGrupo)
  if (!newParticipantesEmGrupo) {
    return res.status(400).send('Erro ao criar participantes')
  }
  return res.status(200).json(newParticipantesEmGrupo)
})

routes.post('/participantesEmGrupo/search', async (req, res) => {
  const participanteEmGrupoController = new ParticipanteEmGrupoController()
  const playerEmGrupo = req.body
  const participantesEmGrupo = await participanteEmGrupoController.searchGruposDeParticipante(playerEmGrupo) 

  if (!participantesEmGrupo) {
    return res.status(400).send('Erro ao buscar participantes de um grupo')
  }
  return res.status(200).json(participantesEmGrupo)
}) 

routes.get('/participantesEmGrupo', new ParticipanteEmGrupoController().getParticipantesEmGrupo)

routes.post('/vencedores/grupo', async (req, res) => {
  const vencedorGrupoController = new VencedorGrupoController()
  const vencedoresGrupo = req.body.vencedores

  const newVencedor = await vencedorGrupoController.createVariosVencedores(vencedoresGrupo)

  if (!newVencedor) {
    return res.status(400).send('Erro ao definir vencedores de grupo')
  }
  return res.status(200).json(newVencedor)
})
routes.get('/vencedores/grupo/:grupoID', async (req, res) => {
  const vencedorGrupoController = new VencedorGrupoController()
  const grupoID = req.params.grupoID

  const vencedores = await vencedorGrupoController.getVencedoresByGrupoID(grupoID)

  if (!vencedores) {
    return res.status(400).send('Erro ao buscar vencedores de grupo')
  }
  return res.status(200).json(vencedores)
})

routes.post('/users/create', async (req, res) => {
  const userController = new UserController()
  const userData = req.body

  const newUser = await userController.create(userData)
  if (!newUser) {
    return res.status(400).send('Erro ao criar usuário')
  }
  return res.status(200).json(newUser)
})
routes.post('/login', async (req, res) => {
  const userController = new UserController()
  const userData = req.body

  const user = await userController.login(userData)
  if (!user) {
    return res.status(400).send('Erro ao logar usuário')
  }
  return res.status(200).json(user)
}) // Não testado
routes.get('/profile', new UserController().getProfile)

export { routes }

