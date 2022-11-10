import { Injectable } from '@nestjs/common';
import { CreateBlockDto } from './dto/create-block.dto';
import { UpdateBlockDto } from './dto/update-block.dto';
import {InjectModel} from "@nestjs/sequelize";
import {Block} from "./entities/block.entity";
import {User} from "../user/entities/user.entity";

@Injectable()
export class BlockService {

  constructor(@InjectModel(Block) private blockModel: typeof Block) {}

  create(createBlockDto: CreateBlockDto) {
    return 'This action adds a new block';
  }

  async findAll() {
    return await this.blockModel.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} block`;
  }

  update(id: number, updateBlockDto: UpdateBlockDto) {
    return `This action updates a #${id} block`;
  }

  remove(id: number) {
    return `This action removes a #${id} block`;
  }
}
