import * as express from "express";
export let loginRouter = express.Router();

import { authController } from "../controllers/auth.controller/auth.controller";
import { passportObj } from "../controllers/passport.controller/passport.controller";

loginRouter.route("/")
  // Login user
  // POST /api/login
  .post(passportObj.authenticate("local", { session: false }),
  authController.login.bind(authController));
