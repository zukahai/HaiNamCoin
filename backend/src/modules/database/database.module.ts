import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../user/entities/user.entity';
import { Block } from '../../block/entities/block.entity';
import { TransactionsWaiting } from '../../transactions_waiting/entities/transactions_waiting.entity';
import { JoinConfirmTransaction } from '../../join_confirm_transactions/entities/join_confirm_transaction.entity';
import { ConfirmTransactionsModule } from '../../confirm_transactions/confirm_transactions.module';
import { ConfirmTransaction } from '../../confirm_transactions/entities/confirm_transaction.entity';
import { ConfirmTransactionUser } from '../../confirm_transaction_users/entities/confirm_transaction_user.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '',
            database: 'hainamcoin',
            entities: [
                User,
                Block,
                TransactionsWaiting,
                JoinConfirmTransaction,
                ConfirmTransaction,
                ConfirmTransactionUser,
            ],
            autoLoadEntities: true,
            synchronize: true,
        }),
    ],
})
export class DatabaseModule {}
