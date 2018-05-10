import * as bodyParser from 'body-parser';
import * as express from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';
import * as path from 'path';
// import { apiRouter } from './routers/api.router';
import { config } from './config';
import { myContainer } from './ioc/ioc.config';
import './ioc/loader';
import { passportMiddlware } from './middlewares/passport.middleware/passport.middleware';

export class Server {
  public readonly app: express.Application;
  constructor() {
    this.app = this.setupServer().build();
  }

  public start() {
    /**
     * Start Express server.
     */
    return this.app.listen(this.app.get('port'), () => {
      // tslint:disable-next-line:no-console
      console.log(('  App is running at http://localhost:%d in %s mode'), this.app.get('port'), this.app.get('env'));
      // tslint:disable-next-line:no-console
      console.log('  Press CTRL-C to stop\n');
    });
  }

  private setupServer() {
    const server = new InversifyExpressServer(myContainer, null, { rootPath: '/api' });
    server.setConfig((app) => {

      app.set('port', config.PORT);
      // this.app.set("env", "development");
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(express.static(path.join(__dirname, '../public'), { maxAge: 31557600000 }));
      app.use(passportMiddlware.initialize());

    })
      .setErrorConfig((app) => {
        // catch 404 and forward to error handler
        app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
          const err = new Error('Not Found');
          (err as any).status = 404;
          next(err);
        });

        // error handlers
        // development error handler
        // will print stacktrace
        if (app.get('env') === 'development') {
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
      });
    return server;
  }
}

export const appServer = new Server();
