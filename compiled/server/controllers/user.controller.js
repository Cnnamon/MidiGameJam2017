"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schemas = require("../schemas");
var utilities = require("../utilities");
var UserController = (function () {
    function UserController() {
    }
    UserController.prototype.createUser = function (req, res) {
        var requestUser = req.body.user;
        var user = new schemas.User(requestUser);
        user._id = utilities.DatabaseUtilities.GenerateId();
        user.save(function (err, result) {
            if (utilities.HttpUtilities.checkErr(err, res)) {
                res.send(200);
            }
        });
    };
    return UserController;
}());
exports.userController = new UserController();
//# sourceMappingURL=user.controller.js.map