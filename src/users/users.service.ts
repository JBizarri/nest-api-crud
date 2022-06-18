import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './entities/user.repository';
import { UserStatus } from './user.definition';

@Injectable()
export class UsersService {
  constructor(private readonly repository: UserRepository) {}

  create(createUserDto: CreateUserDto) {
    return this.repository.save(User.create({ ...createUserDto }));
  }

  findAll(status?: UserStatus) {
    return this.repository.list(status);
  }

  findOne(id: number) {
    const user = this.repository.find(id);
    if (!user) throw new NotFoundException();
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.repository.find(id);
    if (!user) throw new NotFoundException();

    user.name = updateUserDto.name;
    return this.repository.save(user);
  }

  remove(id: number) {
    const user = this.repository.find(id);
    if (!user) throw new NotFoundException();

    this.repository.delete(id);
  }
}
