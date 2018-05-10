import { NextFunction, Request, Response } from 'express';
import { inject } from 'inversify';
import {
  controller, httpDelete, httpGet, httpPost, httpPut,
} from 'inversify-express-utils';
import { ITodo } from '../../interfaces/itodo';
import { IUser } from '../../interfaces/iuser';
import { authBearer } from '../../middlewares/passport.middleware/passport.middleware';
import { ITodoService } from '../../services/todo.service/itodo.service';
import { TYPES } from '../../services/types';

@controller('/todos')
export class TodoController {
  constructor(@inject(TYPES.ITodoService) private service: ITodoService) { }
  //  GET /api/todos
  @httpGet('/', authBearer)
  public getAllTodos(req: Request, res: Response, next: NextFunction) {
    const userId: string = (req.user as IUser).id;
    return this.service.getAllTodos(userId)
      .then((result) => {
        return res.json(result);
      })
      .catch(next);
  }

  //  POST /api/todos
  @httpPost('/', authBearer)
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
  @httpDelete('/:id', authBearer)
  public removeTodo(req: Request, res: Response, next: NextFunction) {
    const id: string = req.params.id;
    return this.service.removeTodo(id)
      .then((result) => {
        if (result === null) {
          const err: any = new Error('TodoNotFound');
          err.status = 404;
          throw err;
        }
        return res.json(result);
      })
      .catch(next);
  }
}
