"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpUtilities = (function () {
    function HttpUtilities() {
    }
    HttpUtilities.checkErr = function (err, res) {
        if (err) {
            res.send(400);
            return false;
        }
        return true;
    };
    return HttpUtilities;
}());
exports.HttpUtilities = HttpUtilities;
//# sourceMappingURL=http.utilities.js.map