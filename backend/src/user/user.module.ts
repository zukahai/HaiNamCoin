import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { HashProvider } from '../providers/hash.provider';
import {TypeOrmModule} from "@nestjs/typeorm";
import {BlockModule} from "../block/block.module";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [UserService, HashProvider],
    exports: [UserService],
})
export class UserModule {}
