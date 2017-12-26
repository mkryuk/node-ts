import * as mongoose from "mongoose";
import { ITodo } from "../../interfaces/itodo";
import { appModel } from "../../models/app.model";
import { ITodoModel } from "../../models/itodo.model";
import { ITodoResource } from "./itodo.resource";

export class TodoMongoResource implements ITodoResource {
  constructor(private Todo: mongoose.Model<ITodoModel>) {
  }
  public addTodo(todo: ITodo): Promise<ITodo> {
    return this.Todo.create(todo)
      .then((result) => {
        return this.toITodo(result);
      });
  }
  public removeTodo(conditions: object): Promise<any> {
    return this.Todo.remove(conditions)
      .then((result) => {
        return result;
      });
  }
  public getAllTodos(userId: string): Promise<ITodo[]> {
    return this.Todo.find({ userId })
      .then((result) => {
        return result.map((todo) => this.toITodo(todo));
      });
  }
  public getTodoById(id: string): Promise<ITodo> {
    return this.Todo.findOne({ _id: id })
      .then((result) => {
        return this.toITodo(result);
      });
  }

  private toITodo(obj: ITodoModel): ITodo {
    return {
      userId: obj.userId,
      completed: obj.completed,
      title: obj.title,
    };
  }

}

export const todoMongoResource = new TodoMongoResource(appModel.Todo);
