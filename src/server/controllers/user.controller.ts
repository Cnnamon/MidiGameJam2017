import * as express from "express";
import * as models from "../../models";
import * as schemas from "../schemas";
import * as utilities from "../utilities";

class UserController {

    public createUser(req: express.Request, res: express.Response): void {

        const requestUser = req.body.user as models.IUser;

        var user = new schemas.User(requestUser);
        user._id = utilities.DatabaseUtilities.GenerateId();

        user.save((err: any, result: schemas.IUserModel) => {
            if (utilities.HttpUtilities.checkErr(err, res)) {
                res.send(200);
            }
        });

    }

}

export const userController = new UserController();