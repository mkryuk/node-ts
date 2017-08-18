import { Request, Response } from "express";

import { IUserService } from "./../../services/user.service/iuser.service";
import { userService } from "./../../services/user.service/user.service";

export class UserController {
  constructor(private uService: IUserService) {
  }
  //  GET /api/users
  public getAllUsers(req: Request, res: Response) {
    res.json({ users: this.uService.getAllUsers() });
  }

  //  GET /api/users/:id
  public getUserById(req: Request, res: Response) {
    res.json(this.uService.getUserById(parseInt(req.params.id, 10)));
  }
}

export const userController = new UserController(userService);
