import { Context } from 'koa'
export default class AuthController {
  public static async login(ctx: Context) {
    ctx.body='登录控制器'
  }

  public static async register(ctx: Context) {
    ctx.body='注册控制器'
  }
}