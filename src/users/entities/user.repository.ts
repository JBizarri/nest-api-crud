import { BaseRepository } from '@database/repository';
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(User.tablename);
  }
}
