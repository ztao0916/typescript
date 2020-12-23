import { Context } from 'koa'
import * as argon2 from 'argon2'
import jwt from 'jsonwebtoken'
import { getManager } from 'typeorm'
import { resHandle } from '../util/util'
import { User } from '../entity/user'
import {JWT_SECRET} from '../constants'


export default class AuthController {
  public static async login(ctx: Context) {
    // ctx.body='登录控制器'
    const userRepository = getManager().getRepository(User); //获取到数据库
    //查询传递过来的数据
    const user = await userRepository
    .createQueryBuilder()
    .where({ name: ctx.request.body.name })
    .addSelect('User.password')
      .getOne();
    //判断数据是否存在
    if (!user) {
      ctx.body = resHandle({
        code: 401,
        errMsg: '用户不存在'
      });
    } else if (await argon2.verify(user.password, ctx.request.body.password)) {
      ctx.body = {
        data: {token: jwt.sign({ id: user.id }, JWT_SECRET)}
      }
    } else {
      ctx.body = resHandle({
        code: 401,
        errMsg: '密码错误'
      });
    }
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