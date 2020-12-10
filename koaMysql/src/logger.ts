import { Context } from 'koa'

export default function logger() {
  return async (ctx: Context, next: () => Promise<void>) => {
    const start = Date.now()
    await next()
    const ms = Date.now() - start
    console.log(`type:${ctx.method}-url:${ctx.url}-status:${ctx.status}-耗时:${ms}ms`)
  }
}