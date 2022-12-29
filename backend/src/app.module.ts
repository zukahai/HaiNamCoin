import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {DatabaseModule} from './modules/database/database.module';
import {UserModule} from './user/user.module';
import {BlockModule} from './block/block.module';
import {AutoBankModule} from './auto-bank/auto-bank.module';
import {AuthModule} from './auth/auth.module';
import {AtGuard} from './auth/guards/at.guard';
import {APP_GUARD} from '@nestjs/core';
import {ConfigModule} from "@nestjs/config";
import { TransactionsWaitingModule } from './transactions_waiting/transactions_waiting.module';
import { JoinConfirmTransactionsModule } from './join_confirm_transactions/join_confirm_transactions.module';
import { ConfirmTransactionUsersModule } from './confirm_transaction_users/confirm_transaction_users.module';
import { ConfirmTransactionsModule } from './confirm_transactions/confirm_transactions.module';

@Module({
    imports: [AuthModule, DatabaseModule, AutoBankModule, BlockModule, UserModule, ConfigModule.forRoot(), TransactionsWaitingModule, JoinConfirmTransactionsModule, ConfirmTransactionUsersModule, ConfirmTransactionsModule],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: AtGuard,
        },
    ],
})
export class AppModule {
}
