import * as mongoose from "mongoose";


export class DatabaseUtilities {

    public static GenerateId(): mongoose.Types.ObjectId {
        return mongoose.Types.ObjectId();
    }

}