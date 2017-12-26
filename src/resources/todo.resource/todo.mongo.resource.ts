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
  public removeTodo(id: string): Promise<ITodo> {
    return this.Todo.findByIdAndRemove(id)
      .then((result) => {
        if (result) {
          return this.toITodo(result);
        } else {
          return null;
        }
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

  public dropAllTodos(): Promise<boolean> {
    return this.Todo.remove({})
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

export const todoMongoResource = new TodoMongoResource(appModel.Todo);
