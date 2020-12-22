import Router from '@koa/router'
import AuthController from './controllers/authController'
import UserController from './controllers/userController'

const router = new Router()

//登录,注册
router.post('/auth/login', AuthController.login)
router.post('/auth/register', AuthController.register)

//用户相关
router.get('/users', UserController.listUsers)
router.get('/users/:id', UserController.showUserDetail)
router.put('/users/:id', UserController.updateUser)
router.delete('/users/:id', UserController.deleteUser)

export default router