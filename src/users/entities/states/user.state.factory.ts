import { UserStatus } from '../../user.definition';
import { UserActiveState } from './user.active.state';
import { UserInactiveState } from './user.inactive.state';
import { UserPendingState } from './user.pending.state';
import { UserState } from './user.state';

export class UserStateFactory {
  static create(status: UserStatus): UserState {
    if (status === UserStatus.PENDING) return new UserPendingState();
    if (status === UserStatus.ACTIVE) return new UserActiveState();
    if (status === UserStatus.INACTIVE) return new UserInactiveState();
  }
}
