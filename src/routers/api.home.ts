import * as express from 'express';
import { homeController, HomeController } from './../controllers/home.controller/home.controller';

/* Home API /api/home */
export class HomeRouter {

  constructor(private router: express.Router, private controller: HomeController) {
    this.router.route('/')
      // GET /api/home/
      .get(this.controller.index.bind(controller));
  }

  get homeRouter() {
    return this.router;
  }
}

export const homeRouter = new HomeRouter(express.Router(), homeController).homeRouter;
