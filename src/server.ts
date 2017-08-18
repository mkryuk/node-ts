import * as bodyParser from "body-parser";
import * as express from "express";
import * as path from "path";
import { router as apiRouter } from "./routers/api.router";

const app = express();

app.set("port", 8080);
// app.set("env", "development");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public"), { maxAge: 31557600000 }));

app.use("/api", apiRouter);

/**
 * Start Express server.
 */
app.listen(app.get("port"), () => {
  // tslint:disable-next-line:no-console
  console.log(("  App is running at http://localhost:%d in %s mode"), app.get("port"), app.get("env"));
  // tslint:disable-next-line:no-console
  console.log("  Press CTRL-C to stop\n");
});

// catch 404 and forward to error handler
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  const err = new Error("Not Found");
  (err as any).status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(err.status || 500);
    res.json({
      error: err,
      message: err.message,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(err.status || 500);
  res.json({
    error: {},
    message: err.message,
  });
});

export let server = app;
