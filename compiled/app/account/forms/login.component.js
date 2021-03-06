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
var core_1 = require("@angular/core");
var user_service_js_1 = require("./user.service.js");
var LoginComponent = (function () {
    function LoginComponent(userService) {
        this.userService = userService;
        this.user = {};
    }
    LoginComponent.prototype.login = function () {
        console.log(this.user);
        console.log("login");
        this.userService.loginUser(this.user.email, this.user.password)
            .subscribe(function (response) { return console.log(response); }, function (error) { return console.log(error); });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: 'app-login',
        templateUrl: "/src/app/account/forms/login.html",
    }),
    __metadata("design:paramtypes", [user_service_js_1.UserService])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map