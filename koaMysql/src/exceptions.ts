export class BaseException extends Error {
  //状态码
  status: number;
  //提示信息
  message: string;
}
//多态实现的
export class NotFoundException extends BaseException {
  status = 404;
  constructor(msg?: string) {
    super();
    this.message = msg || '请求地址不存在'
  }
}

export class UnauthorizedException extends BaseException {
  status = 401;
  constructor(msg?: string) {
    super();
    this.message = msg || '请先登录';
  }
}

export class ForbiddenException extends BaseException {
  status = 403;
  constructor(msg?: string) {
    super();
    this.message = msg || '权限不足'
  }
}

export class methodErrException extends BaseException {
  status = 405;
  constructor(msg?: string) {
    super();
    this.message = msg || '请求方式错误'
  }
}