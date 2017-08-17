import * as express from "express";
export let usersRouter = express.Router();

import { userController } from "./../controllers/user.controller/user.controller";

/* Users API /api/users */

usersRouter.route("/")
  // GET /api/users/
  .get(userController.getAllUsers.bind(userController));

usersRouter.route("/:id")
  // GET /api/users/:id
  .get(userController.getUserById.bind(userController));
