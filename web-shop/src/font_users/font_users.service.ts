import { Injectable } from '@nestjs/common';
import { CreateFontUserDto } from './dto/create-font_user.dto';
import { UpdateFontUserDto } from './dto/update-font_user.dto';
import {User} from "../user/entities/user.entity";
import {Font} from "../fonts/entities/font.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {FontUser} from "./entities/font_user.entity";

@Injectable()
export class FontUsersService {
  constructor(@InjectRepository(FontUser) private fontUserRepository: Repository<FontUser>) {
  }

  create(createFontUserDto: CreateFontUserDto) {
    return 'This action adds a new fontUser';
  }

  createByFontUser(user: User, font: Font) {
    return this.fontUserRepository.save({
        user: user,
        font: font
    });
  }

  findAll() {
    return `This action returns all fontUsers`;
  }

  findOne(id: number) {
    return this.fontUserRepository.findOne({
        where: {
            id: id
        },
        relations: ['user', 'font']
    });
  }

  update(id: number, updateFontUserDto: UpdateFontUserDto) {
    return `This action updates a #${id} fontUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} fontUser`;
  }
}
