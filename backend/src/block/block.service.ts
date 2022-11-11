import { Injectable } from '@nestjs/common';
import { CreateBlockDto } from './dto/create-block.dto';
import { UpdateBlockDto } from './dto/update-block.dto';
import {InjectModel} from "@nestjs/sequelize";
import {Block} from "./entities/block.entity";
import {QueryTypes} from "sequelize";

// import crypto from 'crypto';
var crypto = require('crypto');
@Injectable()
export class BlockService {

  constructor(@InjectModel(Block) private blockModel: typeof Block) {}

  async create(createBlockDto: CreateBlockDto) {
    const hash = (await this.findHashCode()).hashcode;
    const text = createBlockDto.from + createBlockDto.to + createBlockDto.value + new Date().toTimeString() + hash;

    createBlockDto.hashcode = this.hash256(text);
    return await this.blockModel.create(createBlockDto);
  }

  async findAll() {
    return await this.blockModel.findAll();
  }

  hash256(text){
    const hashCode = crypto.createHash('sha256').update(text).digest('hex');
    return hashCode;
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

    const hashcode = (lastBlock.length > 0) ? lastBlock[0]['hashcode'] : "HaiNamCoin";
    const createdAt = (lastBlock.length > 1) ? lastBlock[0]['createdAt'] : new Date().toTimeString();

    return {
      "hashcode": hashcode,
      "createdAt": createdAt
    }
  }

}
