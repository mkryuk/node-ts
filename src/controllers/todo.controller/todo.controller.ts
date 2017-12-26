import { Request, Response } from "express";
import { Error } from "mongoose";
import { ITodo } from "../../interfaces/itodo";
import { ITodoService } from "../../services/todo.service/itodo.service";
import { todoService } from "../../services/todo.service/todo.service";
export class TodoController {
  constructor(private service: ITodoService) {
  }
  //  GET /api/todos
  public getAllTodos(req: Request, res: Response, next: any) {
    const userId: string = "123123";
    return this.service.getAllTodos(userId)
      .then((result) => {
        return res.json(result);
      })
      .catch(next);
  }

  //  POST /api/todos
  public addTodo(req: Request, res: Response, next: any) {
    const todo: ITodo = req.body;
    return this.service.addTodo(todo)
      .then((result) => {
        return res.json(result);
      })
      .catch(next);
  }

  //  DELETE /api/todos/:id
  public removeTodo(req: Request, res: Response, next: any) {
    const id: string = req.params.id;
    return this.service.removeTodo(id)
      .then((result) => {
        if (result === null) {
          const err: any = new Error("TodoNotFound");
          err.status = 404;
          throw err;
        }
        return res.json(result);
      })
      .catch(next);
  }
}

export const todoController = new TodoController(todoService);
