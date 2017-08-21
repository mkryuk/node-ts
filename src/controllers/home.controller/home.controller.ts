import { Request, Response } from "express";

export class HomeController {
  //  GET /api/home
  public index(req: Request, res: Response) {
    res.json({ data: "HOME DATA" });
  }
}
export const homeController = new HomeController();
