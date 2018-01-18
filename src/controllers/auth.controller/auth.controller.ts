import { Request, Response } from 'express';
import jwt = require('jsonwebtoken');
import { config } from '../../config';
const secretTokenKey = config.SECRET_TOKEN_KEY;

export class AuthController {

  // POST /api/login
  public login(req: Request, res: Response) {
    // if there is no req.user
    if (!req.user) {
      throw new Error('user credentials empty');
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

export const authController = new AuthController();
