import * as mongoose from "mongoose";
import { config } from "../../config";

export class MongoConnectionService {
  public readonly connection: mongoose.Connection;
  constructor(private connectionString: string) {
    // Mongoose: mpromise (mongoose's default promise library) is deprecated,
    // plug in your own promise library instead: http://mongoosejs.com/docs/promises.html
    // https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/mongoose#promises
    (mongoose as any).Promise = global.Promise;
    this.connection = mongoose.createConnection(connectionString);
    this.connection
      .once("open", () => {
        // tslint:disable-next-line:no-console
        console.log(`mongodb connection created to ${connectionString}`);
      })
      .on("error", (error: any) => {
        // tslint:disable-next-line:no-console
        console.warn(`Warning: ${error}`);
      });
  }
}

export const mongoConnectionService = new MongoConnectionService(config.MONGO_CONNECTION_STRING);
