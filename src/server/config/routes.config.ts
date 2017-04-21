import * as express from "express";
import * as mongoose from "mongoose";
import * as passport from "passport";

import * as controllers from "../controllers";

class ApiRoutes {

    router = express.Router();

    constructor() {

        this.router.route("/user")
            .post(controllers.userController.createUser);

        this.router.route("/authenticate")
            .post(controllers.AuthenticateController.authenticate);
        
    }

}

export const apiRoutes = new ApiRoutes();