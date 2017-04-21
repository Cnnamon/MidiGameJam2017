"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var serveStatic = require("serve-static");
var path = require("path");
var http = require("http");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var compression = require("compression");
var config_1 = require("./server/config");
var SECRET = "secret";
var Server = (function () {
    function Server() {
        this.app = express();
        this.config();
        this.databases();
        this.passport();
        this.routes();
        this.server = http.createServer(this.app);
        this.listen();
    }
    Server.bootstrap = function () {
        return new Server();
    };
    Server.prototype.config = function () {
        this.port = process.env.PORT || 8080;
        this.root = path.join(path.resolve(__dirname, '../'));
        // third party libs ===============================
        // logging
        this.app.use(morgan("dev"));
        // json from body
        this.app.use(bodyParser.json());
        // gzip 
        this.app.use(compression());
        this.app.use(cookieParser(SECRET));
    };
    Server.prototype.ngApp = function (req, res) {
        function onHandleError(parentZoneDelegate, currentZone, targetZone, error) {
            console.warn('Error in SSR, serving for direct CSR');
            res.sendFile('index.html', { root: './src/universal/' });
            return false;
        }
    };
    Server.prototype.routes = function () {
        var _this = this;
        var router;
        router = express.Router();
        // compiled javascript
        this.app.use('/compiled', serveStatic(path.resolve(this.root, 'compiled')));
        // app typescript, pages and templates
        this.app.use('/src/app', serveStatic(path.resolve(this.root, 'src/app')));
        this.app.use('/src/models', serveStatic(path.resolve(this.root, 'src/models')));
        this.app.use('/src/universal', serveStatic(path.resolve(this.root, 'src/universal')));
        // bootstrap
        this.app.use('/node_modules', serveStatic(path.resolve(this.root, 'node_modules')));
        this.app.use("/api", config_1.apiRoutes.router);
        router.get('/', function (request, result) {
            result.sendFile(path.join(_this.root, 'src/app/index.html'));
        });
        this.app.use('*', router);
    };
    Server.prototype.databases = function () {
        // MongoDB URL
        var mongoDBUrl = process.env.MONGODB_URI || 'mongodb://localhost/boilerplate';
        // Get MongoDB handle
        this.mongo = mongoose.connect(mongoDBUrl);
        // plugging in promise lib
        mongoose.Promise = Promise;
    };
    Server.prototype.passport = function () {
        this.app.use(passport.initialize());
        config_1.setUp(passport);
    };
    Server.prototype.listen = function () {
        var _this = this;
        this.server.listen(this.port);
        //add error handler
        this.server.on("error", function (error) {
            console.log("ERROR", error);
        });
        //start listening on port
        this.server.on("listening", function () {
            console.log('==> Listening on port %s. Open up http://localhost:%s/ in your browser.', _this.port, _this.port);
        });
    };
    return Server;
}());
Server.bootstrap();
//# sourceMappingURL=server.js.map