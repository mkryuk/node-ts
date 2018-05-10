import { Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpPost } from 'inversify-express-utils';
import jwt = require('jsonwebtoken');
import { PassportStatic } from 'passport';
import { config } from '../../config';
import { authLocal } from '../../middlewares/passport.middleware/passport.middleware';
import { TYPES } from '../../services/types';

const secretTokenKey = config.SECRET_TOKEN_KEY;

@controller('/login')
export class AuthController {

  // POST /api/login
  @httpPost('/', authLocal)
  public login(req: Request, res: Response) {
    // if there is no req.user
    if (!req.user) {
      return res.status(500).send('User credentials empty');
    }
    // req.user should be filled by authentication middleware
    const token = this.createToken(req.user);
    return res.status(200).json({
      success: true,
      token,
    });
  }

  // create jsonwebtoken from user credentials
  private createToken(user: any) {
    const token = jwt.sign({
      id: user.id,
      login: user.login,
    }, secretTokenKey, {
        expiresIn: 86400,
      });
    return token;
  }
}
