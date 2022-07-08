import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(createUserDto: CreateUserDto) {
    const user = this.repo.create(createUserDto);
    return this.repo.save(user);
  }
  async findById(id: any) {
    return await this.repo.findOneBy({ id });
  }

  async findOneByEmail(email: string) {
    return await this.repo.findOne({ where: { email } });
  }

  findAllEvents() {
    return `This action returns all user`;
  }
}
