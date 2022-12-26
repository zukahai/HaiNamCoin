import { Injectable } from '@nestjs/common';
import { CreateJoinConfirmTransactionDto } from './dto/create-join_confirm_transaction.dto';
import { UpdateJoinConfirmTransactionDto } from './dto/update-join_confirm_transaction.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {JoinConfirmTransaction} from "./entities/join_confirm_transaction.entity";
import {Repository} from "typeorm";
import {TransactionsWaitingService} from "../transactions_waiting/transactions_waiting.service";
import {UserService} from "../user/user.service";

@Injectable()
export class JoinConfirmTransactionsService {
  constructor(
    @InjectRepository(JoinConfirmTransaction) private joinConfirmTransactionsRepository: Repository<JoinConfirmTransaction>,
    private readonly userService: UserService,
    private readonly transactionsWaitingService: TransactionsWaitingService,
  ) {}

  async create(createJoinConfirmTransactionDto: CreateJoinConfirmTransactionDto) {
    const user = await this.userService.findOne(createJoinConfirmTransactionDto.user_id);
    const transaction_waiting = await this.transactionsWaitingService.findOne(createJoinConfirmTransactionDto.transaction_waiting_id);
    return await this.joinConfirmTransactionsRepository.save({
        user_id: user,
        transaction_waiting_id: transaction_waiting,
    });
  }

  findAll() {
    return `This action returns all joinConfirmTransactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} joinConfirmTransaction`;
  }

  async update(id: number, updateJoinConfirmTransactionDto: UpdateJoinConfirmTransactionDto) {
    // return await this.joinConfirmTransactionsRepository.update(id, updateJoinConfirmTransactionDto);
  }

  remove(id: number) {
    return `This action removes a #${id} joinConfirmTransaction`;
  }
}
