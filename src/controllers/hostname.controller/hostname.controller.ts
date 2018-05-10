import { Request, Response } from 'express';
import {
  controller, httpGet,
} from 'inversify-express-utils';
import * as os from 'os';

@controller('/hostname')
export class HostnameController {
  //  GET /api/home
  @httpGet('/')
  public index(req: Request, res: Response) {
    res.json({ host: os.hostname() });
  }
}
