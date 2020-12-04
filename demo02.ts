//泛型,比较难?
function join(first: string | number, second: string | number) {
  return `${first}${second}`
}

join('hello', 'world')

//要求: 如果first传参字符串那么,second也必须是字符串,类型两个相同

interface Waiter {
  anjiao: boolean;
  say: () => {};
}

interface Teacher {
  anjiao: boolean;
  skill: () => {};
}

function judgeWho(staff: Waiter | Teacher) { }

// function add(first: string | number, second: string | number) {
//   return first + second;
// }

//add(1,'a') // Operator '+' cannot be applied to types 'string | number' and 'string | number'

function add(first: string | number, second: string | number) {
  if (typeof first === "string" || typeof second === "string") {
    return `${first}${second}`;
  }
  return first + second;
}
console.log(add(1,'a'))