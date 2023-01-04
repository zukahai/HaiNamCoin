import { Injectable } from '@nestjs/common';
import { CreateFontUserDto } from './dto/create-font_user.dto';
import { UpdateFontUserDto } from './dto/update-font_user.dto';

@Injectable()
export class FontUsersService {
  create(createFontUserDto: CreateFontUserDto) {
    return 'This action adds a new fontUser';
  }

  findAll() {
    return `This action returns all fontUsers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fontUser`;
  }

  update(id: number, updateFontUserDto: UpdateFontUserDto) {
    return `This action updates a #${id} fontUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} fontUser`;
  }
}
