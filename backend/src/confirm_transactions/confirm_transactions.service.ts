import { Injectable } from '@nestjs/common';
import { CreateConfirmTransactionDto } from './dto/create-confirm_transaction.dto';
import { UpdateConfirmTransactionDto } from './dto/update-confirm_transaction.dto';

@Injectable()
export class ConfirmTransactionsService {
  create(createConfirmTransactionDto: CreateConfirmTransactionDto) {
    return 'This action adds a new confirmTransaction';
  }

  findAll() {
    return `This action returns all confirmTransactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} confirmTransaction`;
  }

  update(id: number, updateConfirmTransactionDto: UpdateConfirmTransactionDto) {
    return `This action updates a #${id} confirmTransaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} confirmTransaction`;
  }
}
