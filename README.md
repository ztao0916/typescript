### 全局安装typescript

```js
npm install typescript -g
或者
yarn global add typescript
```

执行过程:

先编译.ts文件,`tsc demo.ts`生成`demo.js`,在执行生成的js文件;

`ts-node`工具的使用

```js
npm install -g ts-node

ts-node demo.ts
```



### 静态类型

简言之,定义好了就只能使用这个类型,不能改变

```js
let web: string = 'hello world'; //web只能是字符串string类型
```

自定义类型:

```js
//定义
interface info {
    name: string,
    age: number
}
//使用
let xiaoming: info = {
    name: '小明',
    age: 18
}
```

#### 基础静态类型

```js
const count : number = 918;
const myName ：string = 'jspang'
```

#### 对象类型

```js
//eg:对象类型
const obj: {name: string, age: number} = {name: '小明', age:18};
//eg:数组类型,必须是数组,数组里每个都是字符串
const arr: String[] = ['ab','ac','bc'];
//eg: 类类型: ming必须是person类对应的对象
class person {}
const ming: person = new person()

//eg: 函数类型 fn: () => string = () 这是声明
const fn: () => string = () => {
  return "fn";
};

```

### 类型注释和类型推断

#### 类型注解

```js
let count: number; //表明count是一个数字类型
count = 123;
```



#### 类型推断

```js
//类型推断
let count02 =3; //vscode自动注释为number类型
```

能推断出来的不用写类型注解,不能推断出来的就一定需要类型注解

```js
function getTotal(one, two) {
	return one+two
}

function getTotal(one: number, two: number) {
	return one+two
}
let total = getTotal(1,2)
```

### 函数参数和返回类型定义

#### 简单类型

有返回值的函数给返回值加上类型注解

```js
function getTotal(one: number, two: number): number {
	return one+two
}
```

无返回值的函数给返回值加上`void`,如果加上返回值就会报错

```js
function sayHello(): void {
  console.log("hello world");
}
```

### never返回值类型

如果一个函数永远执行不完,就可以定义返回值`never`

```js
function forNever(): never {
  while (true) {}
  console.log("Hello JSPang");
}
```

#### 函数参数为对象(解构)时

```js
function add({one, two}){
    return one+two
}
//正确类型注解
function add({one, two}: {one: number, two: number}): number {
    return one+two
}
```

### 数组类型的定义

```js
const arrNum: number[] = [1,2,3]
const arrStr: string[]= ['a','b','c']
const arrUdf: undefined[] = [undefined, undefined]
const arrAll: (number | string)[] = [1,'string', 2]
```

#### 类型别名(type alias)

```js
type info= {name: string, age: Number}

const mary: info[]=[{name: 'mary01', age: 18}]
```

#### 类做别名

```js
class Info {
    name: string,
    age: number
}
const jack: info[] = [{name: 'jack', age:18}]
```

### 元组的使用和类型约束

把数组中的每个元素的类型都固定,就叫元组

```js
const demo: [string, string, number] = ["dajiao", "teacher", 28]
```

### Interface接口

比如招聘需要筛选符合条件的简历,就需要接口来处理,接口就是用来规范类型的

```js
//需求一: 筛选简历[age<25，bust>90]
const screenResume = (name: string, age: number, bust: number): void => {
	let defaultAge = 25;
	let defaultBust = 90;
	// if (age < defaultAge && bust >= defaultBust) {
	// 	console.log(`${name}进入面试`);
	// } else if (age > defaultAge || bust < defaultBust) {
	// 	console.log(`${name}被淘汰`);
	// }
	age < defaultAge && bust >= defaultBust && console.log(`${name}进入面试`);
	age > defaultAge || (bust < defaultBust && console.log(`${name}被淘汰`));
}

screenResume('小花', 23, 91)
screenResume('小绿', 23, 89)

//需求二: 在筛选完成的基础上,老大要看到简历
const getResume = (name: string, age: number, bust: number): void => {
	console.log(`${name}的年龄是${age},bust是${bust}`)
}
getResume('小花', 23, 91)


//两个需求参数和类型注解都是一样的,需要代码复用,把重复的类型注解定义成接口
interface Girl {
	name: string,
	age: number,
	bust: number
}

const screenResumeInterface = (girl: Girl): void => {
	let defaultAge = 25;
	let defaultBust = 90;
	girl.age < 24 && girl.bust >= 90 && console.log(`${girl.name}进入面试`);
  girl.age > 24 || (girl.bust < 90 && console.log(`${girl.name}被淘汰`));
}

const getResumeInterface = (girl: Girl): void => {
	console.log(`${girl.name}的年龄是${girl.age},bust是${girl.bust}`)
}

const girl = {
	name: '小花',
	age: 23,
	bust: 91
}
screenResumeInterface(girl)
getResumeInterface(girl)

```



#### interface和type alias(别名)的区别

```js
//别名
type Gilr1 = string //别名可以是字符串,数组,对象等
//接口interface只接受对象形式
interface Girl {
    name: string,
    age: number,
    bust: number,
    waistline?:number, //表示可选,非必写
    [propname: string]: any, //表示属性名称是字符串类型,属性值是任意类型
    say(): string, //方法say,返回值string
}

```

#### 接口和类的约束

````js
//接口的继承使用extends
//写法一
interface Teacher extends Girl {}
//写法二
interface Teacher extends Girl {
  teach(): string;
}
````

### 类相关

```js
class Lady {
  content = 'hi, 帅锅'
  say(){
      return this.content
  }
}
//ts中类的继承也是使用extends
class Mary extends Lady {
  sayLove() {
    return "I love you";
  }
}
const mary = new Mary()
mary.say()
mary.sayLove()

//类的重写,super关键字,代表父类中的方法
class Mary extends Lady {
  say() {
    return super.say() + '..锅锅'
  }
}

//类的访问类型: private, protected, public
class Person {
    name: string
}
const person = new Person()
person.name='娃哈哈'
console.log(person.name) //娃哈哈,不定义访问类型,默认public

//public允许在类的内部和外部调用
class Person {
    public name: string
}

//private只允许在类的内部调用
class Person{
    private name: string,
    say(): void{
        console.log(this.name)
    }
}
const person = new Person()
person.name='金苹果'
person.say() //不报错,内部调用
console.log(person.name) //报错


//protected允许在类内和继承的子类内使用
class Person {
	protected name: string,
    say(){
        console.log('你好'+this.name)
    }
}
class Teacher extends Person {
    public sayBye(){
        this.name;
    }
}


//类的构造函数,关键字: constructor
//定义了一个name,在构造函数中进行赋值
class Person{
    constructor(public name: string){
        
    }
}


//类的getter,setter和static的使用
//private最大的作用就是封装属性,然后通过getter和setter来进行修改
class Girl {
    constructor(private _age: number){}
    
    get age(){
        return this._age
    }
    
    set age(age: number){
        this._age = age
    }
}
const mary = new Girl(28)
mary.age = 18 //set方法
console.log(mary.age) //get方法,获取年龄,18


//静态修饰符static,不用new构造函数,直接使用类的方法
class Girl {
	static say(){
		return '酒干倘卖无'
    }
}
正常: new Girl().say()
static化: Girl.say()
```



### 联合类型和类型保护

只有联合类型存在的情况下,才需要类型保护.

所谓联合类型,可以认为是变量有一种或多种的类型

```js
//声明Waiter和Teacher接口,判断是谁的方法judgeWho, 里面传入任意值staff,staff可能是waiter,也可能是teacher,就需要使用联合类型,关键符号是竖线
interface Waiter {
  anjiao: boolean;
  say: () => {};
}

interface Teacher {
  anjiao: boolean;
  skill: () => {};
}

function judgeWho(staff: Waiter | Teacher) {}

//如果直接写judgeWho方法会报错,因为judgeWho不能判断联合类型的具体实例是什么
function judgeWho(staff: Waiter | Teacher) {}
```

### 泛型(重难点)

泛型的定义使用`<>`(尖角号),demo如下

```js
function join<demo>(first: number): number{
    return first
}

join<number>(1) //指明join返回值类型是number
```



先放着,感觉有点不好理解



### 命名空间

代码编译完成以后,在控制台输入Header,Content,Footer可以获取到,生成了很多的全局变量不利于代码维护,我只需要一个Page的全局变量

```js
class Header {
  constructor() {
    const elem = document.createElement('div')
    elem.innerText = 'this is header'
    document.body.appendChild(elem)
  }
}

class Content{
  constructor() {
    const elem = document.createElement('div')
    elem.innerText = 'this is content'
    document.body.appendChild(elem)
  }
}

class Footer{
  constructor() {
    const elem = document.createElement('div')
    elem.innerText = 'this is footer'
    document.body.appendChild(elem)
  }
}

class Page {
  constructor() {
    new Header()
    new Content()
    new Footer()
  }
}
```

使用命名空间修改如下:

```js
//定义命名空间,名称为Home,tsc编译以后只暴露命名空间对象
namespace Home {
  class Header {
    constructor() {
      const elem = document.createElement('div')
      elem.innerText = 'this is header'
      document.body.appendChild(elem)
    }
  }
  
  class Content{
    constructor() {
      const elem = document.createElement('div')
      elem.innerText = 'this is content'
      document.body.appendChild(elem)
    }
  }
  
  class Footer{
    constructor() {
      const elem = document.createElement('div')
      elem.innerText = 'this is footer'
      document.body.appendChild(elem)
    }
  }
  //这里必须要有导出,使用export
  export class Page {
    constructor() {
      new Header()
      new Content()
      new Footer()
    }
  }
}
```

组件化修改:

```js
//components.ts,每个都使用export导出
namespace Components {
  export class Header {
    constructor() {
      const elem = document.createElement('div')
      elem.innerText = '头部'
      document.body.appendChild(elem)
    }
  }
  export class Content {
    constructor() {
      const elem = document.createElement('div')
      elem.innerText = '内容'
      document.body.appendChild(elem)
    }
  }

  export class Footer {
    constructor() {
      const elem = document.createElement('div')
      elem.innerText = '底部'
      document.body.appendChild(elem)
    }
  }
}

//page.ts
namespace Home {
  export class Page {
    constructor() {
      new Components.Header()
      new Components.Content()
      new Components.Footer()
    }
  }
}
```

使用tsc编译后,引入js文件到index.html,即可使用.



#### 多文件编译成一个文件

`tsconfig.json`第八行的`module: commonjs `修改为`module: amd`,然后修改16行的`outFile`的注释取消掉,值为目标文件,比如`outFile: ./build/page.js`



### 使用import导入

这里`tsconfig`的第八行依然是`module:amd`

```js
//components.ts文件
export class Header {
    constructor() {
        const elem = document.createElement('div')
        elem.innerText = '头部'
        document.body.appendChild(elem)
    }
}
export class Content {
    constructor() {
        const elem = document.createElement('div')
        elem.innerText = '内容'
        document.body.appendChild(elem)
    }
}

export class Footer {
    constructor() {
        const elem = document.createElement('div')
        elem.innerText = '底部'
        document.body.appendChild(elem)
    }
}

//page.ts文件
import { Header, Content, Footer } from './components'
export default class Page {
  constructor() {
    new Header()
    new Content()
    new Footer()
  }
}
//编译完成的page.js,amd规范代码,不能直接在浏览器运行,可以在node运行
define(["require", "exports", "./components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Page = /** @class */ (function () {
        function Page() {
            new components_1.Header();
            new components_1.Content();
            new components_1.Footer();
        }
        return Page;
    }());
    exports.default = Page;
});
//在页面展示的时候需要引入如下链接
//data-main: 表示入口文件,src引用的是amd规范的requirejs
<script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.js" data-main="./build/page.js"></script>


```

###  parcel打包

```js
//修改package.json
"test": "parcel ./src/index.html"

//运行
yarn test 或者npm run test
```



### 运算符

| 运算符 | 描述                                          | 例子   | 类似于   | 结果 | 十进制 |
| ------ | --------------------------------------------- | ------ | -------- | :--: | ------ |
| &      | 相应位的二进制都为1,该位置的结果才是1         | x=5&1  | 101&001  | 001  | 1      |
| \|     | 相应位的二进制只要有一个为1,该位置的结果就是1 | x=5\|1 | 101\|001 | 101  | 5      |
| ~      | 取反,1为0,0为1                                | x=~5   | ~101     | 010  | 2      |





### 实战:koa连接MySQL

#### tsconfig配置(可做模板)

```js
{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig.json to read more about this file */

    /* Basic Options */
    // "incremental": true,                   /* 是否启用增量编译 */
    "target": "es5",                          /* 编译后的目标版本,这里是编译成es5文件 */
    "module": "commonjs",                     /* 指定模块代码生成遵循的规范,常用:commonjs,amd */
    // "lib": [],                             /* 编译时需要使用那些文件,比如要把es6编译成es5,就需要es6库文件 */
    // "allowJs": true,                       /* 是否允许编译javascript文件,默认false */
    // "checkJs": true,                       /* 是否检查和报告JS文件中的错误,默认false */
    // "jsx": "preserve",                     /* 指定jsx代码用于的开发环境:preserve,react-native,react */
    // "declaration": true,                   /* 编译时生成相应的'.d.ts'文件 */
    // "declarationMap": true,                /* 编译时为每个相应的.d.ts文件生成一个源映射 */
    // "sourceMap": true,                     /* 编译时生成相应的'.map'文件 */
    // "outFile": "./",                       /* 编译时多个文件合并成一个文,只有当module:amd时才支持该配置 */
    // "outDir": "./",                        /* 编译时指定输出文件夹. */
    // "rootDir": "./",                       /* 指定输入文件根目录 */
    // "composite": true,                     /* 启用项目编译 */
    // "tsBuildInfoFile": "./",               /* 指定文件用来存储增量编译信息 */
    // "removeComments": true,                /* 是否将编译后的文件注释删除,默认false,不删除 */
    // "noEmit": true,                        /* 不生成编译文件 */
    // "importHelpers": true,                 /* 是否引入tslib里的复制工具函数,默认为false */
    // "downlevelIteration": true,            /* 当target=es5/es3,为for-of,spread和destructuring中的迭代器提供完全支持 */
    // "isolatedModules": true,               /* Transpile each file as a separate module (similar to 'ts.transpileModule'). */

    /* Strict Type-Checking Options */
    "strict": true,                           /* 是否启动所有类型检查 */
    // "noImplicitAny": true,                 /* 默认false,如果没有设置类型,默认any,设为true,不设置类型报错 */
    // "strictNullChecks": true,              /* strictNullChecks为true时，null和undefined值不能赋给非这两种类型的值 */
    // "strictFunctionTypes": true,           /* 是否使用函数参数双向协变检查 */
    // "strictBindCallApply": true,           /* 设为true后会对bind、call和apply绑定的方法的参数的检测是严格检测的 */
    // "strictPropertyInitialization": true,  /* 非undefined属性是否已经在构造函数里初始化，如果要开启这项，需要同时开启strictNullChecks. */
    // "noImplicitThis": true,                /* 当this表达式的值为any类型的时候，生成一个错误 */
    // "alwaysStrict": true,                  /* 始终以严格模式检查每个模块，并且在编译之后的js文件中加入"use strict"字符串，用来告诉浏览器该js为严格模式 */

    /* Additional Checks */
    // "noUnusedLocals": true,                /* 检查是否有定义了但是没有使用的变量,默认false */
    // "noUnusedParameters": true,            /* 检查是否有在函数体中没有使用的参数,默认false */
    // "noImplicitReturns": true,             /* 用于检查函数是否有返回值,默认false.true会提示 */
    // "noFallthroughCasesInSwitch": true,    /* 检查switch中是否有case没有使用break跳出switch,默认为false */
    // "noUncheckedIndexedAccess": true,      /* Include 'undefined' in index signature results */

    /* Module Resolution Options */
    // "moduleResolution": "node",            /* 指定模块解析策略: node(Node.js),classic(TypeScript pre-1.6) */
    // "baseUrl": "./",                       /* 解析非相对模块名称的基本目录,相对模块不会受baseUrl的影响 */
    // "paths": {},                           /* 用于设置模块名称到基于baseUrl的路径映射 */
    // "rootDirs": [],                        /* 指定一个路径列表,在构建时编译器会将这个路径中的内容都放到一个文件夹中 */
    // "typeRoots": [],                       /* 用来指定声明文件或文件夹的路径列表 */
    // "types": [],                           /* 用于指定需要包含的模块,只有在这里列出的模块的声明文件才会被加载 */
    // "allowSyntheticDefaultImports": true,  /* 用来指定允许从没有默认导出的模块中默认导入 */
    "esModuleInterop": true,                  /* 通过导入内容创建命名空间,实现CommonJS和ES模块之间的互操作性 */
    // "preserveSymlinks": true,              /* 不把符号链接解析为其真实路径??? */
    // "allowUmdGlobalAccess": true,          /* Allow accessing UMD globals from modules. */

    /* Source Map Options */
    // "sourceRoot": "",                      /* 用于指定调试器应该找到TypeScript文件而不是源文件的位置,写入.map文件 */
    // "mapRoot": "",                         /* 用于指定map文件的根路径,指引调试器找到映射文件 */
    // "inlineSourceMap": true,               /* 是否将map文件内容和js文件编译在一个同一个js文件中 */
    // "inlineSources": true,                 /* 是否进一步将ts文件的内容也包含到输出文件中 */

    /* Experimental Options */
    // "experimentalDecorators": true,        /* 是否启用装饰器特性 */
    // "emitDecoratorMetadata": true,         /* 是否为装饰器提供元数据支持 */

    /* Advanced Options */
    "skipLibCheck": true,                     /* 是否跳过声明文件的类型检查 */
    "forceConsistentCasingInFileNames": true  /* 禁止对同一文件使用大小写不一致的引用 */
  },
  "include":["src/**/*"], //要编译的文件路径
  "exclude":[], //要排除的文件
  "references":[] //指定要引用的项目
}

```



#### import {xxx}  和 import xxx区别

加大括号是因为使用的是`export`导出,可以多个

不加大括号是因为使用`export default`导出,唯一



#### 打印请求日志中间件

`await next()`让出执行权,等待下游中间件执行结束以后在运行

```tsx
//server.ts
import Koa from 'koa'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import logger from './logger'

//初始化
const PORT = 7000
const app = new Koa()

console.log(logger)

//注册中间件
app.use(logger())
app.use(cors()) //跨域
app.use(bodyParser()) //解析post请求参数

//响应用户请求
app.use(async ctx => {
  ctx.body ='hello koa'
})

//运行服务器
app.listen(PORT, (): void => {
  console.log(`serve running at localhost:${PORT}`)
})

//logger.ts
import { Context } from 'koa'

export default function logger() {
  return async (ctx: Context, next: () => Promise<void>) => {
    const start = Date.now()
    await next()
    const ms = Date.now() - start
    console.log(`type:${ctx.method}-url:${ctx.url}-status:${ctx.status}-耗时:${ms}ms`)
  }
}
```

#### 路由配置

| 方法   | 路由            | 作用                |
| ------ | --------------- | ------------------- |
| GET    | /users          | 查询所有的用户      |
| GET    | /users/:id      | 查询单个用户        |
| PUT    | /users/:id      | 更新单个用户        |
| DELETE | /users/:id      | 删除单个用户        |
| POST   | /users/login    | 登录(获取JWT Token) |
| POST   | /users/register | 注册                |

