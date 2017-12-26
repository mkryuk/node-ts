import * as uuid from "uuid";
import { config } from "../../../config";
import { ITodo } from "../../../interfaces/itodo";
import { AppModel, IAppModel } from "../../../models/app.model";
import { ITodoResource } from "../../../resources/todo.resource/itodo.resource";
import { TodoMongoResource } from "../../../resources/todo.resource/todo.mongo.resource";
import { MongoConnectionService } from "../../../services/mongo.service/mongo.connection.service";
import { ITodoService } from "../../../services/todo.service/itodo.service";
import { TodoService } from "../../../services/todo.service/todo.service";

let todoService: ITodoService;

describe("mongodb test todos", () => {
  beforeAll((done) => {
    const mongoConnection = new MongoConnectionService(config.MONGO_TEST_CONNECTION_STRING);
    const testModel = new AppModel(mongoConnection);
    const todoResource = new TodoMongoResource(testModel.Todo);
    todoService = new TodoService(todoResource);
    done();
  });

  beforeEach((done) => {
    // clear todos collection
    todoService.dropAllTodos()
      .then(() => { done(); });
  });

  it("should add new todo", (done) => {
    const todo: ITodo = {
      completed: true,
      title: "some Title",
      userId: uuid.v1(),
    };

    todoService.addTodo(todo)
      .then((result) => {
        expect(result.title).not.toBeNull();
        expect(result.title).toEqual(todo.title);
        done();
      });
  });
});
