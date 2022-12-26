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
import databaseConfig from "./modules/database/database.config";

@Module({
    imports: [ConfigModule.forRoot({
        envFilePath: '.env',
        isGlobal: true,
        load: [databaseConfig]
    }), AutoBankModule, BlockModule, UserModule, DatabaseModule, AuthModule],
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
