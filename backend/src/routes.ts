import { Router } from 'express'
import { UserController } from './controllers/Users/UsersController'
import { CSVController } from './controllers/CSV/CSVController'
import multer from 'multer'

const upload = multer({ dest: '/temp/' })

const routes = Router()

// a gente vai deixar isso assim mesmo? Hehe, sem uso apenas para teste!! :)
routes.get('/', (req, res) => {
  res.send('Hello World! Você está na raiz da API!')
})

routes.post('/csv', upload.single('file'), new CSVController().importCSV)
routes.post('/user', new UserController().create)
routes.post('/login', new UserController().login)
routes.get('/profile', new UserController().getProfile)

export { routes }
