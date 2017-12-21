import { ITodo } from "../../interfaces/itodo";
import { ITodoResource } from "../../resources/todo.resource/itodo.resource";
import { todoMongoResource } from "../../resources/todo.resource/todo.mongo.resource";
import { ITodoService } from "./itodo.service";

export class TodoService implements ITodoService {
  constructor(private TodoResource: ITodoResource) {
  }
  public addTodo(todo: ITodo): Promise<ITodo> {
    return this.TodoResource.addTodo(todo)
      .then((result) => {
        return result;
      });
  }
  public removeTodo(conditions: object): Promise<void> {
    return new Promise((resolve, reject) => {
      this.TodoResource.removeTodo(conditions)
        .then((res) => { resolve(res); })
        .catch((err) => { reject(err); });
    });

  }
  public getAllTodos(userId: string): Promise<ITodo[]> {
    return this.TodoResource.getAllTodos(userId)
      .then((result) => {
        return result;
      });
  }
  public getTodoById(id: string): Promise<ITodo> {
    return this.TodoResource.getTodoById(id)
      .then((result) => {
        return result;
      });
  }

}

export const todoService = new TodoService(todoMongoResource);
