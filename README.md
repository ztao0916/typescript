### 装饰器

装饰器是一种特殊类型的声明,它能够被附加到类声明,方法,访问符,属性或参数上. 装饰器使用[@expression](https://github.com/expression)这种形式,expression求值后必须为一个函数,它会在运行时被调用,被装饰的声明信息做为参数传入

装饰器工厂就是一个简单的函数,它返回一个装饰器

```js
function color(value: string) { // 这是一个装饰器工厂
    return function (target) { //  这是装饰器
        // do something with "target" and "value"...
    }
}

//类装饰器,target是constructor(类的构造函数)
@color('blue')
class Color{}
//方法、属性、访问器的装饰器,传入三个参数
//参数一: 对于静态成员来说是类的构造函数,对于实例成员是类的原型对象
//参数二: 成员的名字
//参数三: 成员的属性描述符
// 属性装饰器的第三个参数为undefined
```

#### 类装饰器

```js
const Controller1: ClassDecorator = (target: any) => {
  target.isController = true
  // target.hha = 'haha'
  // target.key= '你好'
  // console.log(target)
  // console.log(target.prototype)
}
@Controller1
class MyClass1{ }
console.log(MyClass1.isController) //true
// @Controller
// class MyClass {
//   public key: string
//   constructor(key) {
//     this.key = key
//   }
// }
// const myClass = new MyClass('mary')
// console.log(myClass.key)
// console.log(myClass.__proto__.constructor)
// console.log(MyClass.hha)

//工厂方法: 要给装饰器传递参数使用
function controller2(label: string): ClassDecorator {
  return (target: any) => {
    target.isController = true;
    target.controllerLabel = label;
  }
}
@controller2('my')
class MyClass2 { }
console.log(MyClass2.controllerLabel)

//类装饰器的定义
// type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void;
//接口
interface Mixinable {
  [funcName: string]: Function;
}
//装饰器[给构造器原型增加函数]
function mixin(List: Mixinable[]): ClassDecorator {
  return (target: any) => {
    Object.assign(target.prototype, ...List);
  }
}
const mixin1 = {
  fun1 () {
      return 'fun1'
  }
};
const mixin2 = {
  fun2 () {
      return 'fun2'
  }
};
@mixin([mixin1, mixin2])
class MyClass3{ }

// console.log(MyClass3.prototype == (new MyClass3()).__proto__)
```



#### 属性装饰器

```js
//属性装饰器, propertyKey：属性名,target：静态属性是类的构造函数，实例属性是类的原型对象
//type PropertyDecorator = (target: Object, propertyKey: string | symbol) => void;
interface CheckRule{
  required: boolean;
}
interface MetaData {
  [key: string]: CheckRule;
}

const Required: PropertyDecorator = (target: any, key: string |symbol) => {
  //都是挂在构造函数的原型上的
  target.__metadata = target.__metadata ? target.__metadata : {}
  target.__metadata[key] = {required: true} // {name: {required: true}, type: {required: true}}
}
//直接定义name,type,表示在创建实例的时候,实例有这两个属性name和type
class MyClass4 {
  @Required
  name: string;

  @Required
  type: string;
}

function validate(entity: MyClass4): boolean {
  //@ts-ignore
  const metadata: MetaData = entity.__metadata;
  if (metadata) {
    let i: number,
      key: string,
      rule: CheckRule;
    const keys = Object.keys(metadata); //获取对象的键数组
    for (i = 0; i < keys.length; i++){
      key = keys[i];
      rule = metadata[key];
      if (rule.required && (entity[key] === undefined || entity[key] === null || entity[key] === '')) {
        return false;
      }
    }
  }
  return true;
}
const entity = new MyClass4()
entity.name = 'mary'
entity.type = ''
console.log(entity.__metadata)
const result: boolean = validate(entity)
console.log('校验结果', result)
```



#### 方法装饰器

3个参数 `target` ,`propertyKey `和 `descriptor`

`descriptor`:   属性描述符

`propertyKey`:  属性名

```js
//使用时添加到方法声明前,用于自动输出方法的调用日志
const log: MethodDecorator = (target: any, key: string | symbol, descriptor: PropertyDecorator) => {
  const className = target.constructor.name; //类的名称
  const oldValue = descriptor.value;
  descriptor.value = function (...params) {
    console.log(`调用${className}.${key}()方法`)
    return oldValue.apply(this, params)
  }
}

class MyClass {
  private name: string;
  constructor(name: string) {
    this.name = name;
  }
  @log
  getName(): string {
    return 'Tom'
  }
}

const entity = new MyClass('Tom')

const name = entity.getName()
// 输出: 调用MyClass.getName()方法
```

#### 参数装饰器

3个参数 `target` ,`propertyKey `和 `parameterIndex`

`parameterIndex`:   在方法参数列表中的索引值

`propertyKey`:  属性名

```js
//type ParameterDecorator = (target: Object, propertyKey: string | symbol, parameterIndex: number) => void;
//使用时添加到参数声明前,用于输出参数信息日志
function logParam(paramName: string = ''): ParameterDecorator {
  return (target: any, key: string | symbol, paramIndex: number) => {
    if (!target.__metadata) {
      target.__metadata = {};
    }
    if (!target.__metadata[key]) {
      target.__metadata[key] = [];
    }
    target.__metadata[key].push({
      paramName,
      paramIndex
    });
  }
}

const Log: MethodDecorator = (target: any, key: string | symbol, descriptor: PropertyDecorator) => {
  const className = target.constructor.name; //类名
  const oldValue = descriptor.value;
  descriptor.value = (...params) => {
    let paramInfo = '';
    if (target.__metadata && target.__metadata[key]) {
      target.__metadata[key].forEach(item => {
        paramInfo += `\n * 第${item.paramIndex}个参数${item.paramName}的值为: ${params[item.paramIndex]}`;
      })
    }
    console.log(`调用${className}.${key}()方法` + paramInfo);
    return oldValue.apply(this, params);
  }
}

class MyClass {
  private name: string;
  constructor(name: string) {
      this.name = name;
  }
  @Log
  getName (): string {
      return 'Tom';
  }
  @Log
  setName(@logParam() name: string): void {
      this.name = name;
  }
  @Log
  setNames( @logParam('firstName') firstName: string, @logParam('lastName') lastName: string): void {
      this.name = firstName + '' + lastName;
  }
}

const entity = new MyClass('Tom');
const name = entity.getName();
// 输出：调用MyClass.getName()方法

entity.setNames('Jone', 'Brown');
/*调用MyClass.setNames()方法
 * 第1个参数lastName的值为: Brown
 * 第0个参数firstName的值为: Jone
*/
```



### `reflect-metadata`

`Reflect`翻译为反射,`metadata`翻译为元数据;

元数据被定义为：描述数据的数据，对数据及信息资源的描述性信息

作用:` Reflect Metadata` 就是通过装饰器来给类添加一些自定义的信息,然后通过反射将这些信息提取出来,也可以通过反射来添加这些信息

#### 引用和`API`

```js
yarn add reflect-metadata

import 'reflect-metadata'

//需要打开tsconfig.js的装饰器属性
"compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
```

`API`接口如下:

```js
//给对象或者属性定义元数据
Reflect.defineMetadata(metadataKey, metadataValue, target);//(元数据key,元数据值, 元数据挂在哪个对象上)
Reflect.defineMetadata(metadataKey, metadataValue, target, propertyKey);//(元数据key,元数据值, 对象,挂在的对象属性)
//检测在对象或者属性上有无元数据密钥
let result = Reflect.hasMetadata(metadataKey, target);
let result = Reflect.hasMetadata(metadataKey, target, propertyKey);
//在对象或属性的原型链上获取元数据键的元数据值
let result = Reflect.getMetadata(metadataKey, target);
let result = Reflect.getMetadata(metadataKey, target, propertyKey);
//获取对象或属性的原型链上的所有元数据键
let result = Reflect.getMetadataKeys(target);
let result = Reflect.getMetadataKeys(target, propertyKey);
//从对象或属性中删除元数据
let result = Reflect.deleteMetadata(metadataKey, target);
let result = Reflect.deleteMetadata(metadataKey, target, propertyKey);
//通过装饰器将元数据应用于构造函数
@Reflect.metadata(metadataKey, metadataValue)
class C {
  // apply metadata via a decorator to a method (property)
  @Reflect.metadata(metadataKey, metadataValue)
  method() {
  }
}
```



#### 获取类型信息

`reflect-metadata`的三种内置`metadataKey`,可以用来获取类型信息:

- `design:type` --- 属性类型
- `design:paramtypes  ` --- 参数类型
- `design:returntype`  --- 返回值类型

```js
function Prop(): PropertyDecorator{
  return (target: object, key: string): void => {
    const type = Reflect.getMetadata('design:type', target, key);
    console.log(type.prototype)
    console.log(`${key} type: ${type.name}`);
  }
}

class SomeClass {
  @Prop()
  public Aprop!: string;
}

class SomeClass1 {
  @Prop()
  public init(): string {
      return 'init'
  }
}
//执行1: 返回String,执行2: 返回Function
```



#### 自定义`metadataKey`

自定义`metadataKey`,在合适的时候在获取它的值

```js
function classDecorator(): ClassDecorator {
  return target => {
    // 在类上定义元数据，key 为 `classMetaData`，value 为 `a`
    Reflect.defineMetadata('classMetaData', 'a', target);
  };
}

function methodDecorator(): MethodDecorator {
  return (target, key, descriptor) => {
    // 在类的原型属性 'someMethod' 上定义元数据，key 为 `methodMetaData`，value 为 `b`
    Reflect.defineMetadata('methodMetaData', 'b', target, key);
  };
}

@classDecorator()
class SomeClass {
  @methodDecorator()
  someMethod() {}
}

Reflect.getMetadata('classMetaData', SomeClass); // 'a'
Reflect.getMetadata('methodMetaData', new SomeClass(), 'someMethod'); // 'b'
```

### 装饰器和`reflect-metadata`应用

使用装饰器可以实现自动注册路由,通过给`Controller`层的类和方法添加装饰器来定义路由信息,当创建路由时,扫描指定目录下的所有`Controller`,获取装饰器定义的路由信息,从而实现自动添加路由

依赖注入是将一个对象所依赖的其他对象直接提供给这个对象，而不是在当前对象中直接构建这些依赖的对象,[nestjs](https://docs.nestjs.com/) 是基于依赖注入的 nodejs web 框架

使用结构如下:

```js
//controller.ts
import 'reflect-metadata'
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
  return (path?: string) => {
    (target: any, propertyKey: string, descriptor: PropertyDecorator) => {
      const route: Route = {
        propertyKey,
        method,
        path: path || ''
      }
      if (!Reflect.hasMetadata('routes', target)) {
        Reflect.defineMetadata('routes', [], target);
      }
      const routes = Reflect.getMetadata('routes', target);
      routes.push(route);
    }
  }
}

export const Get: RouterDecoratorFactory = createRouterDecorator('get');
export const Post: RouterDecoratorFactory = createRouterDecorator('post');
export const Put: RouterDecoratorFactory = createRouterDecorator('put');
export const Delete: RouterDecoratorFactory = createRouterDecorator('delete');
```

