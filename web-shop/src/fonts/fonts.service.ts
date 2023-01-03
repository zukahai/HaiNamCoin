import { Injectable } from '@nestjs/common';
import { CreateFontDto } from './dto/create-font.dto';
import { UpdateFontDto } from './dto/update-font.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Font} from "./entities/font.entity";

@Injectable()
export class FontsService {
  constructor(@InjectRepository(Font) private fontRepository: Repository<Font>) {
  }

  create(createFontDto: CreateFontDto) {
    return 'This action adds a new font';
  }

  async findAll() {
    return await this.fontRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} font`;
  }

  update(id: number, updateFontDto: UpdateFontDto) {
    return `This action updates a #${id} font`;
  }

  remove(id: number) {
    return `This action removes a #${id} font`;
  }
}
