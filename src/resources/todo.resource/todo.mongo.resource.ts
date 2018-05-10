import { inject, injectable } from 'inversify';
import * as mongoose from 'mongoose';
import { ITodo } from '../../interfaces/itodo';
import { ITodoModel } from '../../models/itodo.model';
import { todoSchema } from '../../schema/todo.schema';
import { IMongoConnectionService } from '../../services/mongo.service/imongo.connection.service';
import { MongoConnectionService } from '../../services/mongo.service/mongo.connection.service';
import { TYPES } from '../../services/types';
import { ITodoResource } from './itodo.resource';

@injectable()
export class TodoMongoResource implements ITodoResource {
  private _Todo: mongoose.Model<ITodoModel>;
  constructor(@inject(TYPES.IMongoConnectionService) mongo: IMongoConnectionService) {
    this._Todo = mongo.connection.model<ITodoModel>('Todo', todoSchema);
  }
  public addTodo(todo: ITodo): Promise<ITodo> {
    return this._Todo.create(todo)
      .then((result: ITodoModel) => {
        return this.toITodo(result);
      });
  }
  public removeTodo(id: string): Promise<ITodo> {
    return this._Todo.findByIdAndRemove(id)
      .then((result: ITodoModel) => {
        if (result) {
          return this.toITodo(result);
        } else {
          return null;
        }
      });
  }
  public getAllTodos(userId: string): Promise<ITodo[]> {
    return this._Todo.find({ userId })
      .then((result: ITodoModel[]) => {
        return result.map((todo) => this.toITodo(todo));
      });
  }
  public getTodoById(id: string): Promise<ITodo> {
    return this._Todo.findOne({ _id: id })
      .then((result: ITodoModel) => {
        return this.toITodo(result);
      });
  }

  public dropAllTodos(): Promise<boolean> {
    return this._Todo.remove({})
      .then(() => {
        return true;
      });
  }

  private toITodo(obj: ITodoModel): ITodo {
    return {
      id: obj._id,
      userId: obj.userId,
      completed: obj.completed,
      title: obj.title,
    };
  }

}
