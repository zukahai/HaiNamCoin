import { Module } from '@nestjs/common';
import { BlockService } from './block.service';
import { BlockController } from './block.controller';
import {Block} from "./entities/block.entity";
import {UserModule} from "../user/user.module";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Block]), UserModule],
  controllers: [BlockController],
  providers: [BlockService]
})
export class BlockModule {}
