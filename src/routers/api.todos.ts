import * as  express from 'express';
import { TodoController, todoController } from '../controllers/todo.controller/todo.controller';
import { passportObj } from './../controllers/passport.controller/passport.controller';

export class TodoRouter {

  constructor(private router: express.Router, private controller: TodoController) {
    this.setupRouter();
  }

  get todoRouter() {
    return this.router;
  }

  private setupRouter() {
    /* Todos API /api/todos */

    this.router.route('/')
      // GET /api/todos/
      .get(
      passportObj.authenticate('bearer', { session: false }),
      this.controller.getAllTodos.bind(this.controller))
      // POST /api/todos/
      .post(
      passportObj.authenticate('bearer', { session: false }),
      this.controller.addTodo.bind(this.controller));

    this.router.route('/:id')
      // DELETE /api/todos/:id
      .delete(
      passportObj.authenticate('bearer', { session: false }),
      this.controller.removeTodo.bind(this.controller));
  }
}

export const todoRouter = new TodoRouter(express.Router(), todoController).todoRouter;
