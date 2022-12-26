import { Injectable } from '@nestjs/common';
import { CreateTransactionsWaitingDto } from './dto/create-transactions_waiting.dto';
import { UpdateTransactionsWaitingDto } from './dto/update-transactions_waiting.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {TransactionsWaiting} from "./entities/transactions_waiting.entity";
import {Repository} from "typeorm";

@Injectable()
export class TransactionsWaitingService {
  constructor(
    @InjectRepository(TransactionsWaiting) private transactionsWaitingRepository: Repository<TransactionsWaiting>,
  ) {}

  create(createTransactionsWaitingDto: CreateTransactionsWaitingDto) {
    return 'This action adds a new transactionsWaiting';
  }

  findAll() {
    return `This action returns all transactionsWaiting`;
  }

  async findOne(id: number) {
    return await this.transactionsWaitingRepository.findOneBy({id: id});
  }

  update(id: number, updateTransactionsWaitingDto: UpdateTransactionsWaitingDto) {
    return `This action updates a #${id} transactionsWaiting`;
  }

  remove(id: number) {
    return `This action removes a #${id} transactionsWaiting`;
  }
}
