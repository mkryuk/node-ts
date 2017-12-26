import { Express } from "express";
import { Server } from "./server";
class App {

  constructor(private server: Server) {
  }
  get app() {
    return this.server.app;
  }
  public run() {
    return this.server.start();
  }
}

const main = new App(new Server());
const expressServer = main.run();
export const app = main.app;
