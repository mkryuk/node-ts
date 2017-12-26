import { ITodo } from "../../interfaces/itodo";
import { ITodoResource } from "../../resources/todo.resource/itodo.resource";
import { todoMongoResource } from "../../resources/todo.resource/todo.mongo.resource";
import { ITodoService } from "./itodo.service";

export class TodoService implements ITodoService {
  constructor(private todoResource: ITodoResource) {
  }
  public addTodo(todo: ITodo): Promise<ITodo> {
    return this.todoResource.addTodo(todo)
      .then((result) => {
        return result;
      });
  }
  public removeTodo(id: string): Promise<ITodo> {
    return this.todoResource.removeTodo(id)
      .then((result) => {
        return result;
      });
  }
  public getAllTodos(userId: string): Promise<ITodo[]> {
    return this.todoResource.getAllTodos(userId)
      .then((result) => {
        return result;
      });
  }
  public getTodoById(id: string): Promise<ITodo> {
    return this.todoResource.getTodoById(id)
      .then((result) => {
        return result;
      });
  }

  public dropAllTodos(): Promise<boolean> {
    return this.todoResource.dropAllTodos()
      .then((result) => {
        return result;
      });
  }

}

export const todoService = new TodoService(todoMongoResource);
