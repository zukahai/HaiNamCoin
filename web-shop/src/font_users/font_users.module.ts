import { Module } from '@nestjs/common';
import { FontUsersService } from './font_users.service';
import { FontUsersController } from './font_users.controller';

@Module({
  controllers: [FontUsersController],
  providers: [FontUsersService]
})
export class FontUsersModule {}
