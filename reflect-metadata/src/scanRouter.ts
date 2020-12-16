import fs from 'fs';
import path from 'path';
import Router from '@koa/router';
import { Route } from './controller'


//扫描指定目录的controller并添加路由
function scanController(dirPath: string, router: Router): void {
  if (!fs.existsSync(dirPath)) {
    console.warn(`${dirPath}目录不存在!`)
  }
  const fileNames: string[] = fs.readdirSync(dirPath);
  for (const name of fileNames) {
    const curPath: string = path.join(dirPath, name);
    if (fs.statSync(curPath).isDirectory()) {
      scanController(curPath, router);
      continue;
    }
  }
}