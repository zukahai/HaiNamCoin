import { Module } from '@nestjs/common';
import { ConfirmTransactionUsersService } from './confirm_transaction_users.service';
import { ConfirmTransactionUsersController } from './confirm_transaction_users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfirmTransactionUser } from './entities/confirm_transaction_user.entity';
import { UserModule } from '../user/user.module';
import { ConfirmTransactionsModule } from '../confirm_transactions/confirm_transactions.module';
import { BlockModule } from '../block/block.module';
import { JoinConfirmTransactionsModule } from '../join_confirm_transactions/join_confirm_transactions.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([ConfirmTransactionUser]),
        UserModule,
        ConfirmTransactionsModule,
        BlockModule,
        JoinConfirmTransactionsModule,
    ],
    controllers: [ConfirmTransactionUsersController],
    providers: [ConfirmTransactionUsersService],
    exports: [ConfirmTransactionUsersService],
})
export class ConfirmTransactionUsersModule {}
