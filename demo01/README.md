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







