import { Module } from '@nestjs/common';
import { JoinConfirmTransactionsService } from './join_confirm_transactions.service';
import { JoinConfirmTransactionsController } from './join_confirm_transactions.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {JoinConfirmTransaction} from "./entities/join_confirm_transaction.entity";
import {UserModule} from "../user/user.module";
import {TransactionsWaitingModule} from "../transactions_waiting/transactions_waiting.module";

@Module({
  imports: [TypeOrmModule.forFeature([JoinConfirmTransaction]), UserModule, TransactionsWaitingModule],
  controllers: [JoinConfirmTransactionsController],
  providers: [JoinConfirmTransactionsService],
  exports: [JoinConfirmTransactionsService]
})
export class JoinConfirmTransactionsModule {}
