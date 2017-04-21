import * as express from "express";
import * as serveStatic from "serve-static";
import * as path from "path";
import * as http from "http";
import * as morgan from "morgan";
import * as bodyParser from "body-parser";
import * as cookieParser from 'cookie-parser';
import * as mongoose from "mongoose";
import * as passport from "passport";
import * as compression from "compression";

import { apiRoutes, setUp } from "./server/config";

declare var process: any, __dirname: string;
const SECRET = "secret";

class Server {

    public app: any;
    public port: number;
    public root: string;
    public server: any;
    private mongo: any;

    public static bootstrap(): Server {
        return new Server();
    }

    constructor() {

        this.app = express();

        this.config();

        // this.databases();

        this.passport();

        this.routes();

        this.server = http.createServer(this.app);

        this.listen();

    }

    private config(): void {
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
    }

    private ngApp(req: any, res: any) {

        function onHandleError(parentZoneDelegate: any, currentZone: any, targetZone: any, error: any) {
            console.warn('Error in SSR, serving for direct CSR');
            res.sendFile('index.html', { root: './src/universal/' });
            return false;
        }

    }

    private routes(): void {
        let router: express.Router;
        router = express.Router();

        // compiled javascript
        this.app.use('/compiled', serveStatic(path.resolve(this.root, 'compiled')));

        // app typescript, pages and templates
        this.app.use('/src/app', serveStatic(path.resolve(this.root, 'src/app')));
        this.app.use('/src/models', serveStatic(path.resolve(this.root, 'src/models')));
        this.app.use('/src/universal', serveStatic(path.resolve(this.root, 'src/universal')));

        // bootstrap
        this.app.use('/node_modules', serveStatic(path.resolve(this.root, 'node_modules')));

        this.app.use("/api", apiRoutes.router);

        router.get('/', (request: express.Request, result: express.Response) => {
            result.sendFile(path.join(this.root, 'src/app/index.html'));
        });

        this.app.use('*', router);
    }

    private databases(): void {
        // MongoDB URL
        let mongoDBUrl = process.env.MONGODB_URI || 'mongodb://localhost/boilerplate';

        // Get MongoDB handle
        this.mongo = mongoose.connect(mongoDBUrl);

        // plugging in promise lib
        (<any>mongoose).Promise = Promise;
    }

    private passport(): void {
        this.app.use(passport.initialize());
        setUp(passport);
    }

    private listen(): void {
        this.server.listen(this.port);

        //add error handler
        this.server.on("error", (error: any) => {
            console.log("ERROR", error);
        });

        //start listening on port
        this.server.on("listening", () => {
            console.log('==> Listening on port %s. Open up http://localhost:%s/ in your browser.', this.port, this.port);
        });
    }

}

Server.bootstrap();