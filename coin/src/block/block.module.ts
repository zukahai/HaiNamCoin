import { Module } from '@nestjs/common';
import { BlockService } from './block.service';
import { BlockController } from './block.controller';
import {Block} from "./entities/block.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserModule} from "../user/user.module";

@Module({
  imports: [TypeOrmModule.forFeature([Block]), UserModule],
  controllers: [BlockController],
  providers: [BlockService],
  exports: [BlockService]
})
export class BlockModule {}
