import { BaseDao } from '@database/dao';
import { UserStatus } from '@users/user.definition';
import { User } from './user.entity';

export class UserDao extends BaseDao<User> {
  constructor() {
    super(User.tablename);
  }

  filterAll(status?: UserStatus): User[] {
    if (!status) return this.list();
    return this.list()
      .filter((user) => user.status === status)
      .slice();
  }
}
