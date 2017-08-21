import * as express from "express";
import { passportObj } from "./../controllers/passport.controller/passport.controller";
export let usersRouter = express.Router();

import { userController } from "./../controllers/user.controller/user.controller";

/* Users API /api/users */

usersRouter.route("/")
  // GET /api/users/
  .get(userController.getAllUsers.bind(userController));

usersRouter.route("/:id")
  // GET /api/users/:id
  .get(userController.getUserById.bind(userController));

usersRouter.route("/:id/info")
  .get(
  passportObj.authenticate("bearer", { session: false }),
  userController.getUserInfo.bind(userController));
