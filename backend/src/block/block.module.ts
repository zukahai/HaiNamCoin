import { Module } from '@nestjs/common';
import { BlockService } from './block.service';
import { BlockController } from './block.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../user/entities/user.entity";
import {Block} from "./entities/block.entity";

@Module({
  imports: [SequelizeModule.forFeature([Block])],
  controllers: [BlockController],
  providers: [BlockService]
})
export class BlockModule {}
