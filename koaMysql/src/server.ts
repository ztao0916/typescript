import Koa from 'koa'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import { createConnection } from 'typeorm'
import 'reflect-metadata'
import logger from './logger'
import router from './router'
import { errorHandle } from './util/util'
import {User} from './entity/user'

createConnection()
.then(async (connection) => {
  //初始化
  const PORT = 7000
  const app = new Koa()

  //注册中间件
  app.use(logger())
  app.use(errorHandle())
  app.use(cors()) //跨域
  app.use(bodyParser()) //解析post请求参数
  app.use(router.routes()).use(router.allowedMethods())
  //运行服务器
  app.listen(PORT, (): void => {
    console.log(`serve running at localhost:${PORT}`)
  })
}).catch((err:string) => {
  console.log('TypeORM connection error:', err)
})