import * as mongoose from 'mongoose';
import { ITodoModel } from '../models/itodo.model';
import { todoSchema } from '../schema/todo.schema';
import {
  mongoConnectionService,
  MongoConnectionService,
} from '../services/mongo.service/mongo.connection.service';

export interface IAppModel {
  Todo: mongoose.Model<ITodoModel>;
}

export class AppModel implements IAppModel {
  public Todo: mongoose.Model<ITodoModel>;
  constructor(mongo: MongoConnectionService) {
    this.Todo = mongo.connection.model<ITodoModel>('Todo', todoSchema);
  }

}

export const appModel = new AppModel(mongoConnectionService);
