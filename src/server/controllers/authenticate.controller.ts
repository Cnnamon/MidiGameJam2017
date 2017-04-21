import * as express from "express";
import * as jwt from "jwt-simple";

import * as models from "../../models";
import * as schemas from "../schemas";
import * as utilities from "../utilities";
import { globals } from "../config/globals.config";

export class AuthenticateController {

    constructor() {

    }

    public static validateUser(user: schemas.IUserModel, password: string, res: express.Response): void {
        if (!user) {
            res.send(401);
        } else {
            user.comparePassword(password,
                (err: any, isMatch: boolean) => {
                    if (utilities.HttpUtilities.checkErr(err, res)) {
                        if (isMatch) {
                            const token = jwt.encode(user, globals.secret);
                            res.json({ token: `${token}`, user: user });
                        } else {
                            res.send(401);
                        }
                    }

                }
            );
        }
    }

    public static authenticate(req: express.Request, res: express.Response): void {

        const email = req.body.email as string;
        const password = req.body.password as string;

        if (!email || !password) {
            res.send(400);
            return;
        }

        schemas.User.findOne({ email: email })
            .then((user) => {
                AuthenticateController.validateUser(user, password, res);
            })
            .catch(err => utilities.HttpUtilities.checkErr(err, res));

    }

}
