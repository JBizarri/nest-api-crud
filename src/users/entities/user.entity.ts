import { BaseEntity } from '@database/entity';
import { UserStatus } from '../user.definition';

interface CreateUserProps {
  name: string;
}

interface UserProps extends CreateUserProps {
  status: UserStatus;
}

export class User extends BaseEntity {
  private props: UserProps;

  constructor(props: UserProps) {
    super();
    this.props = { ...props };
  }

  static create(props: CreateUserProps): User {
    return new User({ ...props, status: UserStatus.PENDING });
  }

  get name() {
    return this.props.name;
  }

  set name(val: string) {
    if (val) this.props.name = val;
  }

  get status() {
    return this.props.status;
  }

  set status(val: UserStatus) {
    if (val) this.props.status = val;
  }
}
