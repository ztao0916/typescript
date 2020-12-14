//装饰器工厂
function color(value: string) {
  return (target: Function) => {
    console.log(target)
  }
}
//类装饰器,只有一个参数,target是类的构造函数[Function: Color]
@color('blue')
class Color{ }

function sealed() {
  return (target: Function) => {
    console.log(target)
    console.log(target.prototype)
  }
}

@sealed()
class Greeter{
  constructor(public message: string) {
  }
}

