import * as express from "express";
import { homeRouter } from "./api.home";
import { loginRouter } from "./api.login";
import { todoRouter } from "./api.todos";
import { userRouter } from "./api.users";

export interface IRoute {
  url: string;
  router: express.Router;
}

export class ApiRouter {

  private routes: IRoute[];
  get apiRouter() {
    return this.router;
  }
  constructor(private router: express.Router) {
    const routes = [
      // API for home
      // Router for /api/home
      { url: "/home", router: homeRouter },
      // API for users
      // Router for /api/users
      { url: "/users", router: userRouter },
      // API for todos
      // Router for /api/todos
      { url: "/todos", router: todoRouter },
      // API for login
      // Router for /api/login
      { url: "/login", router: loginRouter },
    ];
    this.setupRouter();
    this.setupApiRoutes(routes);
  }

  public setupRouter() {
    // enable CORS
    this.router.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods",
        "OPTIONS, GET, POST, PUT, DELETE");
      res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization",
      );
      next();
    });
  }

  public addApiRoute(url: string, router: express.Router) {
    this.router.use(url, router);
  }

  public setupApiRoutes(routes: IRoute[]) {
    routes.forEach((route) => {
      this.addApiRoute(route.url, route.router);
    });
  }

}

export const apiRouter = new ApiRouter(express.Router()).apiRouter;
