import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { UserModule } from './user/user.module';
import { BlockModule } from './block/block.module';

@Module({
  imports: [DatabaseModule, UserModule, BlockModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
