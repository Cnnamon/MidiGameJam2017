"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var DatabaseUtilities = (function () {
    function DatabaseUtilities() {
    }
    DatabaseUtilities.GenerateId = function () {
        return mongoose.Types.ObjectId();
    };
    return DatabaseUtilities;
}());
exports.DatabaseUtilities = DatabaseUtilities;
//# sourceMappingURL=database.utilities.js.map