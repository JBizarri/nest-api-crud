import { BadRequestException } from '@nestjs/common';
import { UserStatus } from '../../user.definition';
import { User } from '../user.entity';
import { UserState } from './user.state';

export class UserInactiveState extends UserState {
  constructor() {
    super(UserStatus.INACTIVE);
  }

  transition(context: User, to: UserStatus) {
    if (context.status === to) return;

    if (to === UserStatus.ACTIVE) {
      context.status = to;
      return;
    }

    throw new BadRequestException();
  }
}
