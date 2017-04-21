"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");
var Types = mongoose.Schema.Types;
var userSchema = new mongoose.Schema({
    _id: { type: Types.ObjectId },
    email: { type: Types.String, required: true, unique: true },
    password: { type: Types.String, required: true },
    createDate: { type: Types.Date, default: Date.now }
});
// hash password
userSchema.pre("save", saveHanlder);
userSchema.method("comparePassword", comparePassword);
function saveHanlder(next) {
    var user = this;
    if (this.isModified("password") || this.isNew) {
        bcrypt.genSalt(5, function (err, salt) {
            if (err)
                return next(err);
            bcrypt.hash(user.password, salt, null, function (err1, hash) {
                if (err1)
                    return next(err1);
                user.password = hash;
                next();
            });
        });
    }
    else {
        return next();
    }
}
function comparePassword(password, next) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err)
            return next(err);
        next(null, isMatch);
    });
}
exports.User = mongoose.model("User", userSchema);
//# sourceMappingURL=user.schema.js.map