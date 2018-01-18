import { ITodo } from '../../interfaces/itodo';

export interface ITodoService {
  addTodo(todo: ITodo): Promise<ITodo>;
  removeTodo(id: string): Promise<ITodo>;
  getAllTodos(userId: string): Promise<ITodo[]>;
  getTodoById(id: string): Promise<ITodo>;
  dropAllTodos(): Promise<boolean>;
}
