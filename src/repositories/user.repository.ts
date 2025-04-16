import { Injectable } from '@nestjs/common';
import { DataSource, FindOneOptions, Repository } from 'typeorm';
import { User } from '../entities/user.entity.js';
import { CreateUserReqDto } from '../dto/request/createUser.req.dto.js';
import { UpdateUsernameByIdReqDto } from '../dto/request/updateUsernameById.dto.js';

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

  async updateUsernameById(dto: UpdateUsernameByIdReqDto): Promise<User | null> {
    const user = await this.findOne({ where: { id: dto.id } });
    if (!user) return null;

    user.username = dto.username;
    return await this.save(user);
  }
}
