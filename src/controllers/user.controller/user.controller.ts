import { Request, Response } from 'express';
import { IUserService } from './../../services/user.service/iuser.service';
import { userService } from './../../services/user.service/user.service';

export class UserController {
  constructor(private uService: IUserService) {
  }
  //  GET /api/users
  public getAllUsers(req: Request, res: Response) {
    const users = this.uService.getAllUsers()
      .map((user) => {
        return { id: user.id, name: user.name, username: user.username };
      });
    res.json({ users });
  }

  //  GET /api/users/:id
  public getUserById(req: Request, res: Response) {
    const user = this.uService.getUserById(req.params.id);
    res.json({ id: user.id, name: user.name, username: user.username });
  }
  //  GET /api/users/:id/info
  public getUserInfo(req: Request, res: Response) {
    const user = this.uService.getUserById(req.params.id);
    res.json(user);
  }
}

export const userController = new UserController(userService);
