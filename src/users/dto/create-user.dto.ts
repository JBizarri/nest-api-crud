import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @Expose()
  @IsString()
  name: string;
}
