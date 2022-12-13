import { Module } from '@nestjs/common';
import { ConfirmTransactionsService } from './confirm_transactions.service';
import { ConfirmTransactionsController } from './confirm_transactions.controller';

@Module({
  controllers: [ConfirmTransactionsController],
  providers: [ConfirmTransactionsService]
})
export class ConfirmTransactionsModule {}
