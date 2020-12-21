import {Context} from 'koa';
import { Controller, Get } from '../common/decorator/controller';
import UserService from '../service/userService';

@Controller('/users')
export default class UserController {
  @Get()
  static async getUsers(ctx: Context) {
    const users = await UserService.findUsers();
    ctx.body = users;
  }

  @Get('/:id')
  static async getUserById(ctx: Context) {
    const id = ctx.params.id;
    const user = await UserService.findUserById(id);
    ctx.body = user;
  }
}