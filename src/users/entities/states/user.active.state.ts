import { BadRequestException } from '@nestjs/common';
import { UserStatus } from '../../user.definition';
import { User } from '../user.entity';
import { UserState } from './user.state';

export class UserActiveState extends UserState {
  constructor() {
    super(UserStatus.ACTIVE);
  }

  transition(to: UserStatus, context: User) {
    if (context.status === to) return;

    if (to === UserStatus.INACTIVE) {
      context.status = to;
      return;
    }

    throw new BadRequestException();
  }
}
