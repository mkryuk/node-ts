import { Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpGet } from 'inversify-express-utils';
import { PassportStatic } from 'passport';
import { passportMiddlware } from '../../middlewares/passport.middleware/passport.middleware';
import { TYPES } from '../../services/types';
import { IUserService } from './../../services/user.service/iuser.service';

@controller('/users')
export class UserController {
  constructor(@inject(TYPES.IUserService) private uService: IUserService) {
  }
  //  GET /api/users
  @httpGet('/')
  public getAllUsers(req: Request, res: Response) {
    const users = this.uService.getAllUsers()
      .map((user) => {
        return { id: user.id, name: user.name, username: user.username };
      });
    res.json({ users });
  }

  //  GET /api/users/:id
  @httpGet('/:id')
  public getUserById(req: Request, res: Response) {
    const user = this.uService.getUserById(req.params.id);
    res.json({ id: user.id, name: user.name, username: user.username });
  }
  //  GET /api/users/:id/info
  @httpGet('/:id/info', passportMiddlware.authenticate('bearer', { session: false }))
  public getUserInfo(req: Request, res: Response) {
    const user = this.uService.getUserById(req.params.id);
    res.json(user);
  }
}
