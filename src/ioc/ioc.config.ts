import * as fs from 'fs';
import { Container } from 'inversify';
import { config } from '../config';
import { ITodoResource } from '../resources/todo.resource/itodo.resource';
import { TodoMongoResource } from '../resources/todo.resource/todo.mongo.resource';
import { TYPES as ResourcesTypes } from '../resources/types';
import { IMongoConnectionService } from '../services/mongo.service/imongo.connection.service';
import { MongoConnectionService } from '../services/mongo.service/mongo.connection.service';
import { ITodoService } from '../services/todo.service/itodo.service';
import { TodoService } from '../services/todo.service/todo.service';
import { TYPES as ServicesTypes } from '../services/types';
import { IUserService } from '../services/user.service/iuser.service';
import { UserService } from '../services/user.service/user.service';

const myContainer = new Container();
myContainer
  .bind<IMongoConnectionService>(ServicesTypes.IMongoConnectionService)
  .toConstantValue(new MongoConnectionService(config.MONGO_CONNECTION_STRING));
myContainer.bind(ResourcesTypes.IDataResource).toConstantValue(fs);

myContainer.bind<ITodoResource>(ResourcesTypes.ITodoResource).to(TodoMongoResource);
myContainer.bind<ITodoService>(ServicesTypes.ITodoService).to(TodoService);
myContainer.bind<IUserService>(ServicesTypes.IUserService).to(UserService);

export { myContainer };
