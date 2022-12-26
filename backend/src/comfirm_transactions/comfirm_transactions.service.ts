import { Injectable } from '@nestjs/common';
import { CreateComfirmTransactionDto } from './dto/create-comfirm_transaction.dto';
import { UpdateComfirmTransactionDto } from './dto/update-comfirm_transaction.dto';

@Injectable()
export class ComfirmTransactionsService {
  create(createComfirmTransactionDto: CreateComfirmTransactionDto) {
    return 'This action adds a new comfirmTransaction';
  }

  findAll() {
    return `This action returns all comfirmTransactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comfirmTransaction`;
  }

  update(id: number, updateComfirmTransactionDto: UpdateComfirmTransactionDto) {
    return `This action updates a #${id} comfirmTransaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} comfirmTransaction`;
  }
}
