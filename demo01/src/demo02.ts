//泛型,比较难?
function join(first: string | number, second: string | number): void {
  console.log(`${first}${second}`)
}

join('hello', 'world')

//要求: 如果first传参字符串那么,second也必须是字符串,类型两个相同

function add(first: string | number, second: string | number) {
  if (typeof first === "string" || typeof second === "string") {
    return `${first}${second}`;
  }
  return first + second;
}
console.log(add(1, 'a'))

/**
 * 泛型: 通常使用<>括号定义
 * 先放着 不怎么好理解呀
 */