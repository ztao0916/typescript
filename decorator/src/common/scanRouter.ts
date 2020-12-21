import fs from 'fs'
import path from 'path'
import KoaRouter from 'koa-router'
import { Route } from './decorator/controller'

/**
 * 扫描指定目录的Controller并添加路由
 * @param dirPath 扫描的目录
 * @param router 路由对象
 */
function scanController(dirPath: string, router: KoaRouter): void {
  if (!fs.existsSync(dirPath)) {
    console.warn(`目录不存在！${dirPath}`);
    return;
  }
  //获取到扫描目录下的信息
  const fileName: string[] = fs.readdirSync(dirPath);
  //循环获取到的数组
  for (const name of fileName) {
    //获取到当前文件的路径
    const curPath: string = path.resolve(dirPath, name);
    if (fs.statSync(curPath).isDirectory()) {
      scanController(curPath, router);
      continue; //跳出当前循环,执行下一次循环
    }
    //是不是ts或者react文件
    if (!(/(.ts|.tsx|.js|.jsx)$/.test(name))) {
      continue;
    }
    //执行具体代码
    try {
      const scanneModule = require(curPath); //加载文件
      //看看有没有导出的文件,export default ...
      const controller = scanneModule.default || scanneModule;
      //看看导出的路由有没有挂载装饰器
      const isController: boolean = Reflect.hasMetadata('basePath', controller);
      const hasRoutes: boolean = Reflect.hasMetadata('routes', controller);
      //如果既有类装饰器又挂载了路由装饰器
      if (isController && hasRoutes) {
        //获取到基础路径和路由信息
        const basePath: string = Reflect.getMetadata('basePath', controller);
        const routes: Route[] = Reflect.getMetadata('routes', controller);
        let curPath: string, curRouteHandler;
        routes.forEach((route: Route) => {
          curPath = path.posix.join('/', basePath, route.path);//;路由路径
          curRouteHandler = controller[route.propertyKey]; //获取到路由对应的处理函数
          router[route.method](curPath, curRouteHandler); //router.get(/abc, fn);
          console.info(`router: ${controller.name}.${route.propertyKey} [${route.method}] ${curPath}`)
        });
      }
    } catch (err) {
      console.warn('读取文件失败', curPath, err);
    }
  }
}

//导出路由
export default class scanRouter extends KoaRouter {
  constructor(opt?: KoaRouter.IRouterOptions) {
    super(opt); //调用一次父类
  }
  //子类的方法
  scan(scanDir: string | string[]) {
    if (typeof scanDir === 'string') {
      scanController(scanDir, this);
    } else if (scanDir instanceof Array) {
      scanDir.forEach(async (dir: string) => {
        scanController(dir, this);
      })
    }
  }
}