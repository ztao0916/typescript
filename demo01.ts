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