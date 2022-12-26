import { Module } from '@nestjs/common';
import { ComfirmTransactionsService } from './comfirm_transactions.service';
import { ComfirmTransactionsController } from './comfirm_transactions.controller';

@Module({
  controllers: [ComfirmTransactionsController],
  providers: [ComfirmTransactionsService]
})
export class ComfirmTransactionsModule {}
