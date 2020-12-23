import { Context } from 'koa'

export default function logger() {
  return async (ctx: Context, next: () => Promise<void>) => {
    const start = Date.now()
    await next()
    const ms = Date.now() - start
    if (ctx.url !== '/favicon.ico') {
      console.log(`${ctx.method}  ${ctx.url}  ${ctx.status}  ${ms}ms`)
    }
  }
}