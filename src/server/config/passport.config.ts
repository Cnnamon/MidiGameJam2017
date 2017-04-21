import * as passport from "passport";
import * as passportJwt from "passport-jwt";

import { globals } from "./globals.config";

import { IUserDocument, User } from "../schemas/user.schema";
// import * as Models from ".././models/interfaces/Models";
// import * as Enums from ".././models/interfaces/Enums";

export function setUp(passport: passport.Passport) {
    
    var options = {} as passportJwt.StrategyOptions;
    options.secretOrKey = globals.secret;
    options.jwtFromRequest = passportJwt.ExtractJwt.fromAuthHeader();
    
    var jwtStartegy = new passportJwt.Strategy(options,
        (payload: IUserDocument, done: passportJwt.VerifiedCallback) => {

            User.findOne({ id: payload._id }, (err, user) => {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            });

        }
    );

    passport.use(jwtStartegy);

}