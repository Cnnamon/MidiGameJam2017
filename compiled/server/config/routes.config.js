"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var controllers = require("../controllers");
var ApiRoutes = (function () {
    function ApiRoutes() {
        this.router = express.Router();
        this.router.route("/user")
            .post(controllers.userController.createUser);
        this.router.route("/authenticate")
            .post(controllers.AuthenticateController.authenticate);
    }
    return ApiRoutes;
}());
exports.apiRoutes = new ApiRoutes();
//# sourceMappingURL=routes.config.js.map