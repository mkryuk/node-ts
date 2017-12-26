import * as express from "express";
import { authController, AuthController } from "../controllers/auth.controller/auth.controller";
import { passportObj } from "../controllers/passport.controller/passport.controller";

export class LoginRouter {
  constructor(private router: express.Router, private controller: AuthController) {
    this.router.route("/")
      // Login user
      // POST /api/login
      .post(passportObj.authenticate("local", { session: false }),
      this.controller.login.bind(this.controller));
  }

  get loginRouter() {
    return this.router;
  }
}

export const loginRouter = new LoginRouter(express.Router(), authController).loginRouter;
