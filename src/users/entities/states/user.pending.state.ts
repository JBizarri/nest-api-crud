import { UserStatus } from '../../user.definition';
import { User } from '../user.entity';
import { UserState } from './user.state';

export class UserPendingState extends UserState {
  constructor() {
    super(UserStatus.PENDING);
  }

  transition(to: UserStatus, context: User) {
    context.status = to;
  }
}
