export interface Route {
  propertyKey: string,
  method: string,
  path: string
}

export function Controller(path: string = ''): ClassDecorator {
  return (target: any) => {
    Reflect.defineMetadata('basePath', path, target);
  }
}

export type RouterDecoratorFactory = (path?: string) => MethodDecorator;

export function createRouterDecorator(method: string): RouterDecoratorFactory {
  return (path?: string) => (target: any, propertyKey: string, descriptor: PropertyDecorator) => {
    const route: Route = {
      propertyKey,
      method,
      path: path || ''
    };
    if (Reflect.hasMetadata('routes', target)) {
      Reflect.defineMetadata('routes', [], target);
    }
    const routes = Reflect.getMetadata('routes', target);
    routes.push(route);
  }
}

export const Get: RouterDecoratorFactory = createRouterDecorator('get');
export const Post: RouterDecoratorFactory = createRouterDecorator('post');
export const Put: RouterDecoratorFactory = createRouterDecorator('put');
export const Delete: RouterDecoratorFactory = createRouterDecorator('delete');