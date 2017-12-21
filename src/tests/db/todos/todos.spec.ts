import * as uuid from "uuid";
import { config } from "../../../config";
import { ITodo } from "../../../interfaces/itodo";
import { AppModel, IAppModel } from "../../../models/app.model";

let testModel: IAppModel;

describe("mongodb test todos", () => {
  beforeAll((done) => {
    testModel = new AppModel(config.MONGO_TEST_CONNECTION_STRING);
    done();
  });

  beforeEach((done) => {
    // clear todos collection
    testModel.Todo.remove({})
      .then(() => {
        done();
      });
  });

  it("should add new todo", (done) => {
    const todo: ITodo = {
      completed: true,
      title: "some Title",
      userId: uuid.v1(),
    };

    testModel.Todo.create(todo)
      .then((result) => {
        // verify _id property exists
        expect(result._id).not.toBeNull();
        done();
      });
  });
});
