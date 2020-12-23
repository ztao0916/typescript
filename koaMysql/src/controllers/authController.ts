import { Context } from 'koa'
import * as argon2 from 'argon2'
import { getManager } from 'typeorm'
import { resHandle } from '../util/util'
import { User } from '../entity/user'


export default class AuthController {
  public static async login(ctx: Context) {
    ctx.body='登录控制器'
  }

  public static async register(ctx: Context) {
    // ctx.body='注册控制器'
    const userRepository = getManager().getRepository(User);
    const newUser = new User();
    newUser.name = ctx.request.body.name;
    newUser.email = ctx.request.body.email;
    newUser.password = await argon2.hash(ctx.request.body.password);
    // 保存到数据库
    const user = await userRepository.save(newUser);
    ctx.body = resHandle({
      data: user
    })
  }
}