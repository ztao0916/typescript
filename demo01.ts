function demo01(){
	let web: string = 'hello world';
	console.log('结果',web);
}
demo01()

let count: number = 1;
// count = "jspang";//type 'string' is not assignable to type 'number'

interface info {
	name: string,
	age: 18
}

let ming: info = {
	name: '小明',
	age: 18
}

console.log(ming) //The expected type comes from property 'age' which is declared here on type 'info'

//class对应的是构造函数
class person {}
const mingp: person = new person()

console.log(mingp)

//函数类型
const fn: () => string = () => {
  return "fn";
};

//类型注解
let count01: number;
count01 = 2;

//类型推断
let count02 = 'abcd';

// function getTotal(one, two) {
// 	return one+two
// }

function getTotal(one: number, two: number): number {
	return one+two
}
let total = getTotal(1, 2)

console.log(total)

function sayHello(): void {
  console.log("hello world");
}

sayHello()

//函数参数类型为对象解构
function add({one, two}: {one: number, two: number}): number {
	return one+two
}
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

/**
 * sex?: string 表示可选字段
 * [propname: string]: any 表示任意字符串字段名,值是任意类型
 * say(): string 表示函数,返回值是string类型
 */
interface Boy {
	name: string,
	age: number,
	height: number,
	sex?: string,
	[propname: string]: any,
	say(): string
}

const jack: Boy = {
	name: 'jack',
	age: 18,
	height: 180,
	say() {
		return 'hello mary!'
	},
	sex: 'male',
	ttt: 123
}
console.log(jack)


//类的getter,setter和static的使用
//private最大的作用就是封装属性,然后通过getter和setter来进行修改
//static作用,不实例化直接使用类中的方法
class Girls {
	constructor(private _age: number){}
	
	get age(){
		return this._age
	}

	set age(age: number){
		this._age = age
	}

	static say(): void {
		console.log('酒干倘卖无')
	}
}
const mary = new Girls(28)
mary.age = 18 //set方法设置年龄
console.log(mary.age) //get方法获取年龄

Girls.say()

//抽象类:关键词abstract,抽象方法的关键词也是abstract
abstract class Girlss {
	abstract skill()
}

class Waiter extends Girlss {
	skill() {
		console.log('喝水')
	}
}

class baseTeacher extends Girlss {
	skill() {
		console.log('按摩')
	}
}

class seniorTeacher extends Girlss {
	skill() {
		console.log('SPA')
	}
}

//枚举的值是从0开始的类数组下标,如果不想从零开始
// enum Status {
//   MASSAGE,
//   SPA,
//   DABAOJIAN,
// }
//从1开始
enum Status {
  MASSAGE=1,
  SPA,
  DABAOJIAN,
}

console.log(Status.MASSAGE, Status.SPA, Status.DABAOJIAN, Status[1])
