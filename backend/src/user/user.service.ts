import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userModel.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.findAll();
  }

  async findOne(id: number): Promise<User> {
    return await this.userModel.findByPk(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    if (await this.findOne(id)) {
      await this.userModel.update(updateUserDto, { where: { id } });
      return await this.findOne(id);
    } else throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async remove(id: number): Promise<void> {
    if (await this.findOne(id)) {
      await this.userModel.destroy({ where: { id } });
    } else throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }
}
