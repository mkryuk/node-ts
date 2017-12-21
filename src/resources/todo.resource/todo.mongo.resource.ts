import * as mongoose from "mongoose";
import { ITodo } from "../../interfaces/itodo";
import { appModel } from "../../models/app.model";
import { ITodoModel } from "../../models/itodo.model";
import { ITodoResource } from "./itodo.resource";

export class TodoMongoResource implements ITodoResource {
  constructor(private Todo: mongoose.Model<ITodoModel>) {
  }
  public addTodo(todo: ITodo): Promise<ITodoModel> {
    return this.Todo.create(todo);
  }
  public removeTodo(conditions: object): mongoose.Query<void> {
    return this.Todo.remove(conditions);
  }
  public getAllTodos(userId: string): Promise<ITodoModel[]> {
    return this.Todo.find({ userId })
      .then((result) => {
        return result;
      });
  }
  public getTodoById(id: string): Promise<ITodoModel> {
    return this.Todo.findOne({ _id: id })
      .then((result) => {
        return result;
      });
  }

}

export const todoMongoResource = new TodoMongoResource(appModel.Todo);
