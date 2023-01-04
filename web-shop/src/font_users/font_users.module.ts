import { Module } from '@nestjs/common';
import { FontUsersService } from './font_users.service';
import { FontUsersController } from './font_users.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {FontUser} from "./entities/font_user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([FontUser])],
  controllers: [FontUsersController],
  providers: [FontUsersService],
  exports: [FontUsersService]
})
export class FontUsersModule {}
