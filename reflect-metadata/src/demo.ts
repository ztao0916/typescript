import 'reflect-metadata';

//做类的修饰器
@Reflect.metadata('inClass', 'A')
class Test {
  //做方法的修饰器
  @Reflect.metadata('inMethod', 'B')
  public hello(): string {
    return 'hello world';
  }
}

//api
let result1 = Reflect.getMetadata('inClass', Test)
let result2 = Reflect.getMetadata('inMethod', new Test(), 'hello')

console.log(result1, result2)


// 获取类型信息
// function Prop(): PropertyDecorator{
//   return (target: object, key: string): void => {
//     const type = Reflect.getMetadata('design:type', target, key);
//     console.log(`${key} type: ${type.name}`);
//   }
// }

// class SomeClass {
//   @Prop()
//   public Aprop!: string;
// }
// class PropDemo {
//   @Prop()
//   public init(): string {
//       return 'init'
//   }
// }

//自定义key,然后获取key值
function classDecorator(): ClassDecorator {
  return target => {
    // 在类上定义元数据，key 为 `classMetaData`，value 为 `a`
    Reflect.defineMetadata('classMetaData', 'a', target)
  }
}

function methodDecorator(): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    // 在类的原型属性 'someMethod' 上定义元数据，key 为 `methodMetaData`，value 为 `b`
    Reflect.defineMetadata('methodMetaData', 'b', target, propertyKey);
    console.log('属性值', descriptor.value)
  }
}

@classDecorator()
class SomeClass {
  @methodDecorator()
  someMethod(): string {
    return 'abc'
  }
}

console.log(Reflect.getMetadata('classMetaData', SomeClass)); // 'a'
console.log(Reflect.getMetadata('methodMetaData', new SomeClass(), 'someMethod')); // 'b'