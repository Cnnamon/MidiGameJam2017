import * as mongoose from "mongoose";
import * as bcrypt from "bcrypt-nodejs";

import * as Models from "../../models";

var Types = mongoose.Schema.Types;

export interface IUserDocument extends mongoose.Document {
    comparePassword(password: string, cb: Function): boolean;
}

export interface IUserModel extends Models.IUser, IUserDocument { }

const userSchema = new mongoose.Schema({
    _id: { type: Types.ObjectId },
    email: { type: Types.String, required: true, unique: true },
    password: { type: Types.String, required: true },
    createDate: { type: Types.Date, default: Date.now }
});

// hash password
userSchema.pre("save", saveHanlder);
userSchema.method("comparePassword", comparePassword);

function saveHanlder(next: any): void {
    var user = this as IUserModel;

    if (this.isModified("password") || this.isNew) {
        bcrypt.genSalt(5,
            (err, salt) => {
                if (err) return next(err);

                bcrypt.hash(user.password,
                    salt,
                    null,
                    (err1, hash) => {
                        if (err1) return next(err1);
                        user.password = hash;
                        next();
                    });

            });
    } else {
        return next();
    }
}

function comparePassword(password: string, next: Function): void {
    bcrypt.compare(password, this.password,
        (err, isMatch) => {
            if (err) return next(err);
            next(null, isMatch);
        });
}

export const User = mongoose.model<IUserModel>("User", userSchema);