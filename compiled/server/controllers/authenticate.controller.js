"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jwt-simple");
var schemas = require("../schemas");
var utilities = require("../utilities");
var globals_config_1 = require("../config/globals.config");
var AuthenticateController = (function () {
    function AuthenticateController() {
    }
    AuthenticateController.validateUser = function (user, password, res) {
        if (!user) {
            res.send(401);
        }
        else {
            user.comparePassword(password, function (err, isMatch) {
                if (utilities.HttpUtilities.checkErr(err, res)) {
                    if (isMatch) {
                        var token = jwt.encode(user, globals_config_1.globals.secret);
                        res.json({ token: "" + token, user: user });
                    }
                    else {
                        res.send(401);
                    }
                }
            });
        }
    };
    AuthenticateController.authenticate = function (req, res) {
        var email = req.body.email;
        var password = req.body.password;
        if (!email || !password) {
            res.send(400);
            return;
        }
        schemas.User.findOne({ email: email })
            .then(function (user) {
            AuthenticateController.validateUser(user, password, res);
        })
            .catch(function (err) { return utilities.HttpUtilities.checkErr(err, res); });
    };
    return AuthenticateController;
}());
exports.AuthenticateController = AuthenticateController;
//# sourceMappingURL=authenticate.controller.js.map