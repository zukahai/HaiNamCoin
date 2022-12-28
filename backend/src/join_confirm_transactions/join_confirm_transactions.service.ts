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
    const user_join_confirm_transaction = user.join_confirm_transaction;

    console.log(user_join_confirm_transaction);
    if (user_join_confirm_transaction) {
      return this.update(user_join_confirm_transaction.id);
    }

    return await this.joinConfirmTransactionsRepository.save({
        user: user,
        transaction_waiting: transaction_waiting,
    });
  }

  findAll() {
    return this.joinConfirmTransactionsRepository.find();
  }

  async getNumberJoinConfirmTransaction(transaction_waiting_id: number) {
    const transaction_waiting = await this.transactionsWaitingService.findOne(transaction_waiting_id);
    return transaction_waiting.join_confirm_transaction.length;
  }

  findOne(id: number) {
    return this.joinConfirmTransactionsRepository.findOneBy({id: id});
  }

  async update(id: number) {
    const joinConfirmTransaction = await this.joinConfirmTransactionsRepository.findOneBy({id: id});
    joinConfirmTransaction.time_join = new Date();
    this.joinConfirmTransactionsRepository.save(joinConfirmTransaction);
    return joinConfirmTransaction;
  }

  remove(id: number) {
    return `This action removes a #${id} joinConfirmTransaction`;
  }
}
