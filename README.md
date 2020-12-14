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

#### Controller 与 Get 的实现

依赖注入是将一个对象所依赖的其他对象直接提供给这个对象，而不是在当前对象中直接构建这些依赖的对象,[nestjs](https://docs.nestjs.com/) 是基于依赖注入的 nodejs web 框架

使用结构如下:

```js
@Controller('/test')
class SomeClass {
  @Get('/a')
  someGetMethod() {
    return 'hello world';
  }

  @Post('/b')
  somePostMethod() {}
}
```

