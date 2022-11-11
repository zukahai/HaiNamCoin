import { Injectable } from '@nestjs/common';
import { CreateBlockDto } from './dto/create-block.dto';
import { UpdateBlockDto } from './dto/update-block.dto';
import {InjectModel} from "@nestjs/sequelize";
import {Block} from "./entities/block.entity";
import {QueryTypes} from "sequelize";

@Injectable()
export class BlockService {

  constructor(@InjectModel(Block) private blockModel: typeof Block) {}

  async create(createBlockDto: CreateBlockDto) {
    console.log(CreateBlockDto);
    return await this.blockModel.create(createBlockDto);
  }

  async findAll() {
    return await this.blockModel.findAll();
  }

  async findOne(id: number) {
    return await this.blockModel.findByPk(id);
  }

  update(id: number, updateBlockDto: UpdateBlockDto) {
    return `This action updates a #${id} block`;
  }

  remove(id: number) {
    return `This action removes a #${id} block`;
  }

  async findHashCode() {
    const lastBlock = await this.blockModel.sequelize.query('SELECT * FROM blocks ' +
        'WHERE createdAt = (SELECT max(createdAt) FROM blocks) LIMIT 1',
        { type: QueryTypes.SELECT });
    return {
      "hashcode": lastBlock[0]['hashcode'],
      "createdAt": lastBlock[0]['createdAt']
    }
  }

}
