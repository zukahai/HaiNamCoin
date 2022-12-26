import { Module } from '@nestjs/common';
import { TransactionsWaitingService } from './transactions_waiting.service';
import { TransactionsWaitingController } from './transactions_waiting.controller';

@Module({
  controllers: [TransactionsWaitingController],
  providers: [TransactionsWaitingService]
})
export class TransactionsWaitingModule {}
