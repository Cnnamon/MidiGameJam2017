import * as express from "express";


export class HttpUtilities {

    public static checkErr(err: any, res: express.Response): boolean {
        if (err) {
            res.send(400);
            return false;
        }
        return true;
    }

}