import * as bodyParser from "body-parser";
import * as express from "express";
import * as path from "path";
import { config } from "./config";
import { passportObj } from "./controllers/passport.controller/passport.controller";
import { apiRouter } from "./routers/api.router";

export class Server {
  public readonly app: express.Express;
  constructor() {
    this.app = express();
    this.setupServer();
  }

  public start() {
    /**
     * Start Express server.
     */
    return this.app.listen(this.app.get("port"), () => {
      // tslint:disable-next-line:no-console
      console.log(("  App is running at http://localhost:%d in %s mode"), this.app.get("port"), this.app.get("env"));
      // tslint:disable-next-line:no-console
      console.log("  Press CTRL-C to stop\n");
    });
  }

  private setupServer() {

    this.app.set("port", config.PORT);
    // this.app.set("env", "development");
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(express.static(path.join(__dirname, "../public"), { maxAge: 31557600000 }));
    this.app.use(passportObj.initialize());

    // setup router
    this.app.use("/api", apiRouter);

    // catch 404 and forward to error handler
    this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      const err = new Error("Not Found");
      (err as any).status = 404;
      next(err);
    });

    // error handlers
    // development error handler
    // will print stacktrace
    if (this.app.get("env") === "development") {
      this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.status(err.status || 500);
        res.json({
          error: err,
          message: err.message,
        });
      });
    }

    // production error handler
    // no stacktraces leaked to user
    this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      res.status(err.status || 500);
      res.json({
        error: {},
        message: err.message,
      });
    });
    return this.app;
  }
}

export const appServer = new Server();
