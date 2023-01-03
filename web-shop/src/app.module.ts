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
import { SmartContactModule } from './smart_contact/smart_contact.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
    imports: [DatabaseModule, UserModule, AuthModule, FontsModule, SmartContactModule, TransactionsModule],
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
