import Koa from 'koa'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import jwt from 'koa-jwt'
import { createConnection } from 'typeorm'
import 'reflect-metadata'
import logger from './logger'
import router from './router'
import { errorHandle } from './util/util'
import { User } from './entity/user'
import {JWT_SECRET} from './constants'

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
  // 注册 JWT 中间件,unless内容表示get请求不走中间件
  app.use(jwt({ secret: JWT_SECRET }).unless({ path: [/^\/auth/] }));
  //登录鉴权
  app.use(router.routes()).use(router.allowedMethods());

  //运行服务器
  app.listen(PORT, (): void => {
    console.log(`serve running at localhost:${PORT}`)
  })
}).catch((err:string) => {
  console.log('TypeORM connection error:', err)
})