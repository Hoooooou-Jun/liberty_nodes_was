import { Injectable } from '@nestjs/common';
import { DataSource, FindOneOptions, Repository } from 'typeorm';
import { User } from '../entities/user.entity.js';
import { CreateUserReqDto } from 'src/dto/request/createUser.req.dto.js';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(user: CreateUserReqDto): Promise<User> {
    const newUser = this.create(user);
    return await this.save(newUser);
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const option: FindOneOptions<User> = {
      where: { email },
    };
    return await this.findOne(option);
  }
}
