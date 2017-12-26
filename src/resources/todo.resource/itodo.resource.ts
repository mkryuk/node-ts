import { Query } from "mongoose";
import { ITodo } from "../../interfaces/itodo";
import { ITodoModel } from "../../models/itodo.model";

export interface ITodoResource {
  removeTodo(id: string): Promise<ITodo>;
  getAllTodos(userId: string): Promise<ITodo[]>;
  getTodoById(id: string): Promise<ITodo>;
  addTodo(todo: ITodo): Promise<ITodo>;
  dropAllTodos(): Promise<boolean>;
}
