import { Context } from 'koa'
import { getManager } from 'typeorm'
import { User } from '../entity/user'
import {resHandle} from '../util/util'

export default class UserController {
  public static async listUsers(ctx: Context) {
    // ctx.body="获取所有用户控制器"
    const userRepository = getManager().getRepository(User);
    const users = await userRepository.find();
    ctx.body = resHandle({
      data: users
    })
  }

  public static async showUserDetail(ctx: Context) {
    const userId = +ctx.params.id;
    console.log(ctx.state.user);
    const userRepository = getManager().getRepository(User);
    const user = await userRepository.findOne(userId);
    if (user) {
      ctx.body = resHandle({
        data: user
      })
    } else {
      ctx.body = resHandle({
        code: 404,
        errMsg: '查询的数据不存在'
      })
    }
  }

  public static async updateUser(ctx: Context) {
    const userRepository = getManager().getRepository(User);
    await userRepository.update(+ctx.params.id, ctx.request.body);
    const updatedUser = await userRepository.findOne(+ctx.params.id);
    if (updatedUser) {
      ctx.body = resHandle({
        data: updatedUser
      })
    } else {
      ctx.body = resHandle({
        code: 404,
        errMsg: '需要更新的数据不存在'
      })
    }
  }

  public static async deleteUser(ctx: Context) {
    // ctx.body="删除单个用户"
    const userRepository = getManager().getRepository(User);
    await userRepository.delete(+ctx.params.id);
    ctx.body = resHandle({
      data: '删除数据成功'
    })
  }
}