import Koa from 'koa'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import logger from './logger'
import router from './router'

//初始化
const PORT = 7000
const app = new Koa()

//注册中间件
app.use(logger())
app.use(cors()) //跨域
app.use(bodyParser()) //解析post请求参数
app.use(router.routes()).use(router.allowedMethods())

//响应用户请求
// app.use(async ctx => {
//   ctx.body ='hello koa'
// })

//运行服务器
app.listen(PORT, (): void => {
  console.log(`serve running at localhost:${PORT}`)
})