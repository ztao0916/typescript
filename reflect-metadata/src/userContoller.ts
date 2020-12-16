import { Context } from 'koa'
import { Controller, Get } from './controller'

@Controller('/users')
export default class UserController {
  @Get()
  static async getUsers(ctx: Context) {
    ctx.body = '获取所有用户'
  }
  @Get('/:id')
  static async getUserById(ctx: Context) {
    ctx.body = '根据ID获取用户'
  }
}