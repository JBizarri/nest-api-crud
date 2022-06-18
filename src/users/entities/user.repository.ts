import { BaseRepository } from '@database/repository';
import { Injectable } from '@nestjs/common';
import { UserStatus } from '@users/user.definition';
import { UserDao } from './user.dao';
import { User } from './user.entity';

@Injectable()
export class UserRepository extends BaseRepository<User, UserDao> {
  constructor() {
    super(new UserDao());
  }

  list(status?: UserStatus): User[] {
    return this.dao.filterAll(status);
  }
}
