import { Express } from 'express';
import 'reflect-metadata';

import { appServer, Server } from './server';
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

const main = new App(appServer);
const expressServer = main.run();
export const app = main.app;
