import { Injectable } from '@nestjs/common';
import { CreateTransactionsWaitingDto } from './dto/create-transactions_waiting.dto';
import { UpdateTransactionsWaitingDto } from './dto/update-transactions_waiting.dto';

@Injectable()
export class TransactionsWaitingService {
  create(createTransactionsWaitingDto: CreateTransactionsWaitingDto) {
    return 'This action adds a new transactionsWaiting';
  }

  findAll() {
    return `This action returns all transactionsWaiting`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transactionsWaiting`;
  }

  update(id: number, updateTransactionsWaitingDto: UpdateTransactionsWaitingDto) {
    return `This action updates a #${id} transactionsWaiting`;
  }

  remove(id: number) {
    return `This action removes a #${id} transactionsWaiting`;
  }
}
