import { Context } from 'koa'
import { getManager } from 'typeorm'
import {User} from '../entity/user'

export default class UserController {
  public static async listUsers(ctx: Context) {
    // ctx.body="获取所有用户控制器"
    const userRepository = getManager().getRepository(User);
    const users = await userRepository.find();
  }

  public static async showUserDetail(ctx: Context) {
    ctx.body="单个用户详情控制器"
  }

  public static async updateUser(ctx: Context) {
    ctx.body="更新单个用户"
  }

  public static async deleteUser(ctx: Context) {
    ctx.body="删除单个用户"
  }
}