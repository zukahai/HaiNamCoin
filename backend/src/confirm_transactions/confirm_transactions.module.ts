import { Module } from '@nestjs/common';
import { ConfirmTransactionsService } from './confirm_transactions.service';
import { ConfirmTransactionsController } from './confirm_transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfirmTransaction } from './entities/confirm_transaction.entity';
import { UserModule } from '../user/user.module';
import { TransactionsWaitingModule } from '../transactions_waiting/transactions_waiting.module';
import { BlockModule } from '../block/block.module';
import { JoinConfirmTransactionsModule } from '../join_confirm_transactions/join_confirm_transactions.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([ConfirmTransaction]),
        UserModule,
        TransactionsWaitingModule,
        BlockModule,
        JoinConfirmTransactionsModule,
    ],
    controllers: [ConfirmTransactionsController],
    providers: [ConfirmTransactionsService],
    exports: [ConfirmTransactionsService],
})
export class ConfirmTransactionsModule {}
