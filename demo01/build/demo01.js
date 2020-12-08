"use strict";
function demo01() {
    var web = 'hello world';
    console.log('结果', web);
}
demo01();
var count = 1;
var ming = {
    name: '小明',
    age: 18
};
console.log(ming); //The expected type comes from property 'age' which is declared here on type 'info'
//class对应的是构造函数
var person = /** @class */ (function () {
    function person() {
    }
    return person;
}());
var mingp = new person();
console.log(mingp);
//函数类型
var fn = function () {
    return "fn";
};
//类型注解
var count01;
count01 = 2;
//类型推断
var count02 = 'abcd';
// function getTotal(one, two) {
// 	return one+two
// }
function getTotal(one, two) {
    return one + two;
}
var total = getTotal(1, 2);
console.log(total);
function sayHello() {
    console.log("hello world");
}
sayHello();
//函数参数类型为对象解构
function add01(_a) {
    var one = _a.one, two = _a.two;
    return one + two;
}
//需求一: 筛选简历[age<25，bust>90]
var screenResume = function (name, age, bust) {
    var defaultAge = 25;
    var defaultBust = 90;
    // if (age < defaultAge && bust >= defaultBust) {
    // 	console.log(`${name}进入面试`);
    // } else if (age > defaultAge || bust < defaultBust) {
    // 	console.log(`${name}被淘汰`);
    // }
    age < defaultAge && bust >= defaultBust && console.log(name + "\u8FDB\u5165\u9762\u8BD5");
    age > defaultAge || (bust < defaultBust && console.log(name + "\u88AB\u6DD8\u6C70"));
};
screenResume('小花', 23, 91);
screenResume('小绿', 23, 89);
//需求二: 在筛选完成的基础上,老大要看到简历
var getResume = function (name, age, bust) {
    console.log(name + "\u7684\u5E74\u9F84\u662F" + age + ",bust\u662F" + bust);
};
getResume('小花', 23, 91);
var screenResumeInterface = function (girl) {
    var defaultAge = 25;
    var defaultBust = 90;
    girl.age < 24 && girl.bust >= 90 && console.log(girl.name + "\u8FDB\u5165\u9762\u8BD5");
    girl.age > 24 || (girl.bust < 90 && console.log(girl.name + "\u88AB\u6DD8\u6C70"));
};
var getResumeInterface = function (girl) {
    console.log(girl.name + "\u7684\u5E74\u9F84\u662F" + girl.age + ",bust\u662F" + girl.bust);
};
var girl = {
    name: '小花',
    age: 23,
    bust: 91
};
screenResumeInterface(girl);
getResumeInterface(girl);
var jack = {
    name: 'jack',
    age: 18,
    height: 180,
    say: function () {
        return 'hello mary!';
    },
    sex: 'male',
    ttt: 123
};
console.log(jack);
//类的getter,setter和static的使用
//private最大的作用就是封装属性,然后通过getter和setter来进行修改
//static作用,不实例化直接使用类中的方法
var Girls = /** @class */ (function () {
    function Girls(_age) {
        this._age = _age;
    }
    Object.defineProperty(Girls.prototype, "age", {
        get: function () {
            return this._age;
        },
        set: function (age) {
            this._age = age;
        },
        enumerable: false,
        configurable: true
    });
    Girls.say = function () {
        console.log('酒干倘卖无');
    };
    return Girls;
}());
var mary = new Girls(28);
mary.age = 18; //set方法设置年龄
console.log(mary.age); //get方法获取年龄
Girls.say();
//抽象类:关键词abstract,抽象方法的关键词也是abstract
// abstract class Girlss {
// 	abstract skill()
// }
// class Waiter extends Girlss {
// 	skill() {
// 		console.log('喝水')
// 	}
// }
// class baseTeacher extends Girlss {
// 	skill() {
// 		console.log('按摩')
// 	}
// }
// class seniorTeacher extends Girlss {
// 	skill() {
// 		console.log('SPA')
// 	}
// }
//枚举的值是从0开始的类数组下标,如果不想从零开始
// enum Status {
//   MASSAGE,
//   SPA,
//   DABAOJIAN,
// }
//从1开始
var Status;
(function (Status) {
    Status[Status["MASSAGE"] = 1] = "MASSAGE";
    Status[Status["SPA"] = 2] = "SPA";
    Status[Status["DABAOJIAN"] = 3] = "DABAOJIAN";
})(Status || (Status = {}));
console.log(Status.MASSAGE, Status.SPA, Status.DABAOJIAN, Status[1]);
