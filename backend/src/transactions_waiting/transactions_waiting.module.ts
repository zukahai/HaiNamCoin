import { Module } from '@nestjs/common';
import { TransactionsWaitingService } from './transactions_waiting.service';
import { TransactionsWaitingController } from './transactions_waiting.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TransactionsWaiting} from "./entities/transactions_waiting.entity";

@Module({
  imports : [TypeOrmModule.forFeature([TransactionsWaiting])],
  controllers: [TransactionsWaitingController],
  providers: [TransactionsWaitingService],
  exports: [TransactionsWaitingService]
})
export class TransactionsWaitingModule {}
