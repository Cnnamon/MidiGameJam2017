"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var account_component_js_1 = require("./account.component.js");
var login_component_js_1 = require("./forms/login.component.js");
var register_component_js_1 = require("./forms/register.component.js");
var user_service_js_1 = require("./forms/user.service.js");
var appRoutes = [
    { path: 'login', component: login_component_js_1.LoginComponent },
    { path: 'register', component: register_component_js_1.RegisterComponent }
];
var AccountModule = (function () {
    function AccountModule() {
    }
    return AccountModule;
}());
AccountModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            router_1.RouterModule.forRoot(appRoutes),
            forms_1.FormsModule,
            http_1.HttpModule,
            http_1.JsonpModule,
        ],
        declarations: [account_component_js_1.AccountComponent, login_component_js_1.LoginComponent, register_component_js_1.RegisterComponent],
        bootstrap: [account_component_js_1.AccountComponent],
        providers: [
            user_service_js_1.UserService
        ]
    })
], AccountModule);
exports.AccountModule = AccountModule;
//# sourceMappingURL=account.module.js.map