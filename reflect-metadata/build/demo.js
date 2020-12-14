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
function color(value) {
    return function (target) {
        console.log(target);
    };
}
var Color = (function () {
    function Color() {
    }
    Color = __decorate([
        color('blue')
    ], Color);
    return Color;
}());
function sealed() {
    return function (target) {
        console.log(target);
        console.log(target.prototype);
    };
}
var Greeter = (function () {
    function Greeter(message) {
        this.message = message;
    }
    Greeter = __decorate([
        sealed(),
        __metadata("design:paramtypes", [String])
    ], Greeter);
    return Greeter;
}());
