import * as  express from 'express';
import { passportObj } from './../controllers/passport.controller/passport.controller';
import { userController, UserController } from './../controllers/user.controller/user.controller';

export class UserRouter {

  constructor(private router: express.Router, private controller: UserController) {
    this.setupRouter();
  }

  get userRouter() {
    return this.router;
  }

  private setupRouter() {
    /* Users API /api/users */

    this.router.route('/')
      // GET /api/users/
      .get(this.controller.getAllUsers.bind(this.controller));

    this.router.route('/:id')
      // GET /api/users/:id
      .get(this.controller.getUserById.bind(this.controller));

    this.router.route('/:id/info')
      // GET /api/users/:id/info
      .get(
      passportObj.authenticate('bearer', { session: false }),
      this.controller.getUserInfo.bind(this.controller));
  }
}

export const userRouter = new UserRouter(express.Router(), userController).userRouter;
