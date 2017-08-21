import * as express from "express";
export let homeRouter = express.Router();

import { homeController } from "./../controllers/home.controller/home.controller";

/* Home API /api/home */

homeRouter.route("/")
  // GET /api/home/
  .get(homeController.index.bind(homeController));
