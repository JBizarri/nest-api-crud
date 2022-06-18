import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './entities/user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly repository: UserRepository) {}

  create(createUserDto: CreateUserDto) {
    return this.repository.save(new User({ ...createUserDto }));
  }

  findAll() {
    return this.repository.list();
  }

  findOne(id: number) {
    return this.repository.find(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.repository.find(id);
    if (!user) throw new NotFoundException();

    user.name = updateUserDto.name;
    return this.repository.save(user);
  }

  remove(id: number) {
    this.repository.delete(id);
  }
}
