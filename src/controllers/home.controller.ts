import { Request, Response } from "express";

//  GET /api/index
export function index(req: Request, res: Response) {
  res.json({ data: process.env.NODE_ENV});
}
