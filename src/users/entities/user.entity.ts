import { BaseEntity } from '@ddd/entity';
import { UserStatus } from '../user.definition';
import { UserState } from './states/user.state';
import { UserStateFactory } from './states/user.state.factory';

interface CreateUserProps {
  name: string;
}

interface UserProps extends CreateUserProps {
  state: UserState;
}

export class User extends BaseEntity {
  private props: UserProps;

  constructor(props: UserProps) {
    super();
    this.props = { ...props };
  }

  get name() {
    return this.props.name;
  }

  set name(val: string) {
    if (val) this.props.name = val;
  }

  get status() {
    return this.props.state.state;
  }

  set status(val: UserStatus) {
    this.props.state = UserStateFactory.create(val);
  }

  static create(props: CreateUserProps): User {
    return new User({
      ...props,
      state: UserStateFactory.create(UserStatus.PENDING),
    });
  }

  transition(status: UserStatus) {
    if (status) this.props.state.transition(status, this);
  }
}
