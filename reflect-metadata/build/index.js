"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var Test = (function () {
    function Test() {
    }
    Test.prototype.hello = function () {
        return 'hello world';
    };
    __decorate([
        Reflect.metadata('inMethod', 'B'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", String)
    ], Test.prototype, "hello", null);
    Test = __decorate([
        Reflect.metadata('inClass', 'A')
    ], Test);
    return Test;
}());
var result1 = Reflect.getMetadata('inClass', Test);
var result2 = Reflect.getMetadata('inMethod', new Test(), 'hello');
console.log(result1, result2);
function classDecorator() {
    return function (target) {
        Reflect.defineMetadata('classMetaData', 'a', target);
    };
}
function methodDecorator() {
    return function (target, propertyKey, descriptor) {
        Reflect.defineMetadata('methodMetaData', 'b', target, propertyKey);
        console.log('属性值', descriptor.value);
    };
}
var SomeClass = (function () {
    function SomeClass() {
    }
    SomeClass.prototype.someMethod = function () {
        return 'abc';
    };
    __decorate([
        methodDecorator(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", String)
    ], SomeClass.prototype, "someMethod", null);
    SomeClass = __decorate([
        classDecorator()
    ], SomeClass);
    return SomeClass;
}());
console.log(Reflect.getMetadata('classMetaData', SomeClass));
console.log(Reflect.getMetadata('methodMetaData', new SomeClass(), 'someMethod'));
