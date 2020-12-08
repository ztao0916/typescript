"use strict";
/**
 * 类和对象
 * 对象是类的实例
 * 比如,一只狗,是一个对象,有状态和行为. 状态: 颜色,年龄,姓名,品种;行为: 摇尾巴,吃,叫
 * 比如,男人和女人就是两个类,jack是男人类的一个实例,是一个对象
 */
var Site = /** @class */ (function () {
    function Site() {
    }
    Site.prototype.name = function () {
        console.log('runoob');
    };
    Site.val = 13;
    return Site;
}());
console.log('静态变量可以直接通过类名访问', Site.val);
var obj = new Site();
obj.name();
//var [变量名] : [类型] = 值;变量声明
//static-静态变量,可以通过类名直接访问
