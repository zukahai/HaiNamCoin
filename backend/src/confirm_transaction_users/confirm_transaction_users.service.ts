import { Injectable } from '@nestjs/common';
import { CreateConfirmTransactionUserDto } from './dto/create-confirm_transaction_user.dto';
import { UpdateConfirmTransactionUserDto } from './dto/update-confirm_transaction_user.dto';

@Injectable()
export class ConfirmTransactionUsersService {
  create(createConfirmTransactionUserDto: CreateConfirmTransactionUserDto) {
    return 'This action adds a new confirmTransactionUser';
  }

  findAll() {
    return `This action returns all confirmTransactionUsers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} confirmTransactionUser`;
  }

  update(id: number, updateConfirmTransactionUserDto: UpdateConfirmTransactionUserDto) {
    return `This action updates a #${id} confirmTransactionUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} confirmTransactionUser`;
  }
}
