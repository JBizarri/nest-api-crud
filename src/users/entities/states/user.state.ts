import { UserStatus } from '../../user.definition';
import { User } from '../user.entity';

export abstract class UserState {
  readonly state: UserStatus;

  constructor(state: UserStatus) {
    this.state = state;
  }

  abstract transition(context: User, to: UserStatus): void;
}
