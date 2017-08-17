import * as express from "express";
export let homeRouter = express.Router();

import { HomeController } from "./../controllers/home.controller/home.controller";

const homeController = new HomeController();

/* Home API /api/home */

homeRouter.route("/")
  // GET /api/home/
  .get(homeController.index.bind(homeController));
