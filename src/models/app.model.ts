import * as mongoose from "mongoose";

import { config } from "../config";
import { ITodoModel } from "../models/itodo.model";
import { todoSchema } from "../schema/todo.schema";

export interface IAppModel {
  Todo: mongoose.Model<ITodoModel>;
}

export class AppModel implements IAppModel {
  public Todo: mongoose.Model<ITodoModel>;
  constructor(connectionString: string) {
    // Mongoose: mpromise (mongoose's default promise library) is deprecated,
    // plug in your own promise library instead: http://mongoosejs.com/docs/promises.html
    // https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/mongoose#promises
    (mongoose as any).Promise = global.Promise;
    const connection: mongoose.Connection = mongoose.createConnection(connectionString);
    connection
      .once("open", () => {
        // tslint:disable-next-line:no-console
        console.log(`mongodb connection created to ${connectionString}`);
      })
      .on("error", (error: any) => {
        // tslint:disable-next-line:no-console
        console.warn(`Warning: ${error}`);
      });
    this.Todo = connection.model<ITodoModel>("Todo", todoSchema);
  }

}

export const appModel = new AppModel(config.MONGO_CONNECTION_STRING);
