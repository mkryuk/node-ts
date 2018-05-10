import * as fs from 'fs';
import { inject, injectable } from 'inversify';
import { IUser } from '../../interfaces/iuser';
import { myContainer } from '../../ioc/ioc.config';
import { TYPES } from '../../resources/types';
import { IDataResource, IUserService } from './iuser.service';

@injectable()
export class UserService implements IUserService {
  constructor(@inject(TYPES.IDataResource) private dataResource: IDataResource) {
  }
  public getUserById(id: string): IUser {
    const data = this.dataResource.readFileSync('./data/users.json', 'utf8');
    const parsed = JSON.parse(data);
    const users: IUser[] = parsed.users;
    const filtered = users.filter((user) => user.id === id);
    return filtered && filtered.length ? filtered[0] : null;
  }
  public getUserByUsername(username: string): IUser {
    const data = this.dataResource.readFileSync('./data/users.json', 'utf8');
    const parsed = JSON.parse(data);
    const users: IUser[] = parsed.users;
    const filtered = users.filter((user) => user.username === username);
    return filtered && filtered.length ? filtered[0] : null;
  }
  public getAllUsers(): IUser[] {
    const data = this.dataResource.readFileSync('./data/users.json', 'utf8');
    const parsed = JSON.parse(data);
    const users = parsed.users;
    return users || [];
  }
}

// export const userService = new UserService(fs);
