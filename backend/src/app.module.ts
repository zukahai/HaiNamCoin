import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { UserModule } from './user/user.module';
import { BlockModule } from './block/block.module';
import { AutoBankModule } from './auto-bank/auto-bank.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Block } from './block/entities/block.entity';
import { BlockService } from './block/block.service';

@Module({
    imports: [AutoBankModule, BlockModule, UserModule, DatabaseModule, SequelizeModule.forFeature([Block])],
    controllers: [AppController],
    providers: [AppService, BlockService],
})
export class AppModule {}
