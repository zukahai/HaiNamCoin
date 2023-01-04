import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './auth/at-guard/at-guard.guard';
import { FontsModule } from './fonts/fonts.module';
import { TransactionsModule } from './transactions/transactions.module';
import { SmartContractModule } from './smart_contract/smart_contract.module';

@Module({
    imports: [DatabaseModule, UserModule, AuthModule, FontsModule, SmartContractModule, TransactionsModule, SmartContractModule],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: AtGuard,
        },
    ],
})
export class AppModule {}
