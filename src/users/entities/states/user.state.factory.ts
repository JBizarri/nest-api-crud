import { match } from 'ts-pattern';
import { UserStatus } from '../../user.definition';
import { UserActiveState } from './user.active.state';
import { UserInactiveState } from './user.inactive.state';
import { UserPendingState } from './user.pending.state';
import { UserState } from './user.state';

export class UserStateFactory {
  static PENDING = new UserPendingState();
  static ACTIVE = new UserActiveState();
  static INACTIVE = new UserInactiveState();

  static create(status: UserStatus): UserState {
    return match(status)
      .with(UserStatus.PENDING, () => this.PENDING)
      .with(UserStatus.ACTIVE, () => this.ACTIVE)
      .with(UserStatus.INACTIVE, () => this.INACTIVE)
      .exhaustive();
  }
}
