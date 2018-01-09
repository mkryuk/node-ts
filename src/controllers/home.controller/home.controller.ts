import { Request, Response } from "express";
import * as os from "os";

export class HomeController {
  //  GET /api/home
  public index(req: Request, res: Response) {
    res.json({ data: os.hostname() });
  }
}
export const homeController = new HomeController();
