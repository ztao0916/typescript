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

