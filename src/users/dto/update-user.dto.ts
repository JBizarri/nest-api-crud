import { PartialType } from '@nestjs/mapped-types';
import { Expose } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';
import { UserStatus } from '../user.definition';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @Expose()
  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;
}
