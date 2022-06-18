import { UserStatus } from '@users/user.definition';
import { Expose } from 'class-transformer';

export class ReadUserDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  status: UserStatus;
}
