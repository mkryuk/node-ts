import { ITodo } from "../../interfaces/itodo";

export interface ITodoService {
  addTodo(todo: ITodo): Promise<ITodo>;
  removeTodo(conditions: object): Promise<void>;
  getAllTodos(userId: string): Promise<ITodo[]>;
  getTodoById(id: string): Promise<ITodo>;
}
