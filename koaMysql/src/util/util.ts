import Koa from 'koa'
/**
 * 统一返回结构: code,data, msg
 */
interface Result {
  sucesss: boolean;
  errMsg?: string;
  data: any;
}

export const resHandle = (data:any, errMsg?:string): Result =>{
  if (errMsg) {
    return {
      sucesss: false,
      data: data,
      errMsg
    }
  } else {
    return {
      sucesss: true,
      data: data
    }
  }
}

/**
 * 统一错误处理
 */
export const errorHandle = (): Koa.Middleware => {
  return async (ctx: Koa.Context, next: Koa.Next) => {
    try {
      await next();
      if (ctx.status === 404) {
        ctx.body = resHandle('', '请求地址不存在');
      } else if (ctx.status === 405) {
        ctx.body = resHandle('', `${ctx.originalUrl}方法不允许使用${ctx.method}方式请求`);
      }
    } catch (err) {
      ctx.body = resHandle('', `系统异常`);
    }
  }
}