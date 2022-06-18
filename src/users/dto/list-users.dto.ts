import { UserStatus } from '@users/user.definition';
import { Expose } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';

export class ListUsersQueryDto {
  @Expose()
  @IsOptional()
  @IsEnum(UserStatus)
  status: UserStatus;
}
