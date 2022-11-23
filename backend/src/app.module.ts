import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { UserModule } from './user/user.module';
import { BlockModule } from './block/block.module';
import { AutoBankModule } from './auto-bank/auto-bank.module';

@Module({
    imports: [AutoBankModule, BlockModule, UserModule, DatabaseModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
