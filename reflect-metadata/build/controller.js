"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delete = exports.Put = exports.Post = exports.Get = exports.createRouterDecorator = exports.Controller = void 0;
require("reflect-metadata");
function Controller(path) {
    if (path === void 0) { path = ''; }
    return function (target) {
        Reflect.defineMetadata('basePath', path, target);
    };
}
exports.Controller = Controller;
function createRouterDecorator(method) {
    return function (path) {
        return function (target, propertyKey, descriptor) {
            var route = {
                propertyKey: propertyKey,
                method: method,
                path: path || ''
            };
            if (!Reflect.hasMetadata('routes', target)) {
                Reflect.defineMetadata('routes', [], target);
            }
            var routes = Reflect.getMetadata('routes', target);
            routes.push(route);
        };
    };
}
exports.createRouterDecorator = createRouterDecorator;
exports.Get = createRouterDecorator('get');
exports.Post = createRouterDecorator('post');
exports.Put = createRouterDecorator('put');
exports.Delete = createRouterDecorator('delete');
