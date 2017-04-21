"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var passportJwt = require("passport-jwt");
var globals_config_1 = require("./globals.config");
var user_schema_1 = require("../schemas/user.schema");
// import * as Models from ".././models/interfaces/Models";
// import * as Enums from ".././models/interfaces/Enums";
function setUp(passport) {
    var options = {};
    options.secretOrKey = globals_config_1.globals.secret;
    options.jwtFromRequest = passportJwt.ExtractJwt.fromAuthHeader();
    var jwtStartegy = new passportJwt.Strategy(options, function (payload, done) {
        user_schema_1.User.findOne({ id: payload._id }, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            }
            else {
                done(null, false);
            }
        });
    });
    passport.use(jwtStartegy);
}
exports.setUp = setUp;
//# sourceMappingURL=passport.config.js.map