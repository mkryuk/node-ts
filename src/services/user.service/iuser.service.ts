import { IUser } from "../../interfaces/iuser";

export interface IDataResource {
  readFileSync(filename: string, encoding: string): string;
}

export interface IUserService {
  getAllUsers(): IUser[];
  getUserById(id: number): IUser;
  getUserByUsername(username: string): IUser;
}
