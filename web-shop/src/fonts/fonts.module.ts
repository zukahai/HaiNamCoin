import { Module } from '@nestjs/common';
import { FontsService } from './fonts.service';
import { FontsController } from './fonts.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Font} from "./entities/font.entity";
import {HttpModule} from "@nestjs/axios";
import {UserModule} from "../user/user.module";
import {FontUsersModule} from "../font_users/font_users.module";

@Module({
  imports: [TypeOrmModule.forFeature([Font]), HttpModule, UserModule, FontUsersModule],
  controllers: [FontsController],
  providers: [FontsService],
  exports: [FontsService]
})
export class FontsModule {}
