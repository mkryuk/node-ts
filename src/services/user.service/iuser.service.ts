import { IUser } from "../../models/iuser.model";

export interface IDataResource {
  readFileSync(filename: string, encoding: string): string;
}

export interface IUserService {
  getAllUsers(): IUser[];
  getUserById(id: number): IUser;
}
