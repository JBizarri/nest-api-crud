import { UserStatus } from '../../user.definition';
import { User } from '../user.entity';
import { UserState } from './user.state';

export class UserPendingState extends UserState {
  constructor() {
    super(UserStatus.PENDING);
  }

  transition(context: User, to: UserStatus) {
    context.status = to;
  }
}
