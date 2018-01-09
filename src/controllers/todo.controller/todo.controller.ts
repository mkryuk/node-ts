import { NextFunction, Request, Response } from "express";
import { Error } from "mongoose";
import { ITodo } from "../../interfaces/itodo";
import { IUser } from "../../interfaces/iuser";
import { ITodoService } from "../../services/todo.service/itodo.service";
import { todoService } from "../../services/todo.service/todo.service";
export class TodoController {
  constructor(private service: ITodoService) {
  }
  //  GET /api/todos
  public getAllTodos(req: Request, res: Response, next: NextFunction) {
    const userId: string = (req.user as IUser).id;
    return this.service.getAllTodos(userId)
      .then((result) => {
        return res.json(result);
      })
      .catch(next);
  }

  //  POST /api/todos
  public addTodo(req: Request, res: Response, next: NextFunction) {
    const todo: ITodo = req.body;
    todo.userId = (req.user as IUser).id;
    return this.service.addTodo(todo)
      .then((result) => {
        return res.json(result);
      })
      .catch(next);
  }

  //  DELETE /api/todos/:id
  public removeTodo(req: Request, res: Response, next: NextFunction) {
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
