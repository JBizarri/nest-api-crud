import { BaseEntity } from '@database/entity';

interface UserProps {
  name: string;
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
}
