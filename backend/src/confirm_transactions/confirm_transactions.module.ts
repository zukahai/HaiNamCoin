import { Module } from '@nestjs/common';
import { ConfirmTransactionsService } from './confirm_transactions.service';
import { ConfirmTransactionsController } from './confirm_transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfirmTransaction } from './entities/confirm_transaction.entity';
import { UserModule } from '../user/user.module';
import { TransactionsWaitingModule } from '../transactions_waiting/transactions_waiting.module';

@Module({
    imports: [TypeOrmModule.forFeature([ConfirmTransaction]), UserModule, TransactionsWaitingModule],
    controllers: [ConfirmTransactionsController],
    providers: [ConfirmTransactionsService],
    exports: [ConfirmTransactionsService],
})
export class ConfirmTransactionsModule {}
