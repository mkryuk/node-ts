import { Connection } from 'mongoose';
export interface IMongoConnectionService {
  readonly connection: Connection;
}
