import { Module } from '@nestjs/common';
import { FontsService } from './fonts.service';
import { FontsController } from './fonts.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Font} from "./entities/font.entity";
import {HttpModule} from "@nestjs/axios";

@Module({
  imports: [TypeOrmModule.forFeature([Font]), HttpModule],
  controllers: [FontsController],
  providers: [FontsService],
  exports: [FontsService]
})
export class FontsModule {}
