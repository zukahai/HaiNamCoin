import { Module } from '@nestjs/common';
import { ConfirmTransactionUsersService } from './confirm_transaction_users.service';
import { ConfirmTransactionUsersController } from './confirm_transaction_users.controller';

@Module({
  controllers: [ConfirmTransactionUsersController],
  providers: [ConfirmTransactionUsersService]
})
export class ConfirmTransactionUsersModule {}
