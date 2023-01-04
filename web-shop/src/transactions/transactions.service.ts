import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Transaction} from "./entities/transaction.entity";
import {Repository} from "typeorm";
import {UserService} from "../user/user.service";
import {FontsService} from "../fonts/fonts.service";

@Injectable()
export class TransactionsService {
  constructor(@InjectRepository(Transaction) private smartContactRepository: Repository<Transaction>,
              private readonly userService: UserService,
              private readonly fontService: FontsService,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {

    return this.smartContactRepository.save({
        transaction_id_1: createTransactionDto.transaction_id_1,
        transaction_id_2: createTransactionDto.transaction_id_2,
        font: await this.fontService.findOne(createTransactionDto.font_id),
        from: await this.userService.findOne(createTransactionDto.from_id),
        to: await this.userService.findOne(createTransactionDto.to_id),
        value: createTransactionDto.value
    });
  }

  findAll() {
    return `This action returns all transactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
