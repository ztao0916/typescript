import Koa from 'koa'
/**
 * 统一返回结构: code,data, msg
 */
interface Result {
  code: number;
  msg?: string;
  data?: any;
}
// 参数接口
interface paramObj {
  data?: any,
  errMsg?: string,
  code?: number
}

export const resHandle = (obj: paramObj): Result => {
  const { data, errMsg, code } = obj;
  if (!data && errMsg) {
    return {
      code: code,
      msg: errMsg
    }
  } else {
    return {
      code: 200,
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
        ctx.body = resHandle({
          errMsg: '请求地址不存在',
          code: 404
        });
      } else if (ctx.status === 405) {
        ctx.body = resHandle({
          errMsg: `${ctx.originalUrl}方法不允许使用${ctx.method}方式请求`,
          code: 405
        });
      }
    } catch (err) {
      ctx.body = resHandle({
        errMsg: '系统异常',
        code: 500
      });
    }
  }
}